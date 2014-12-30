/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var util = require("util");
    var vm = require("vm");
    var jsdom = require ("jsdom");

    function FunctionNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.func = n.func;
        var functionText = "var results = null; results = (function(msg){"+this.func+"\n})(msg);";
        this.topic = n.topic;
        var sandbox = {
            console:console,
            util:util,
            Buffer:Buffer,
            context: {
                global:RED.settings.functionGlobalContext || {}
            }
        };
        var context = vm.createContext(sandbox);
        try {
            this.script = vm.createScript(functionText);
            this.on("input", function(msg) {
                try {
                    var start = process.hrtime();
                    context.msg = msg;
                    this.script.runInContext(context);
                    var results = context.results;
                    if (results == null) {
                        results = [];
                    } else if (results.length == null) {
                        results = [results];
                    }
                    if (msg._topic) {
                        for (var m in results) {
                            if (results[m]) {
                                if (util.isArray(results[m])) {
                                    for (var n=0; n < results[m].length; n++) {
                                        results[m][n]._topic = msg._topic;
                                    }
                                } else {
                                    results[m]._topic = msg._topic;
                                }
                            }
                        }
                    }
                    var outputElems = [];
                    var node = this;
                    if (msg.nrSvg && results) {
                      var cp = undefined;
                      if (msg.nrSvg.length != undefined) {
                        cp = msg.nrSvg[0];
                      }
                      else
                        cp = msg.nrSvg;
                      results.forEach (function (pos) {
                        console.log(cp);
                        var elem = cp.clone();
                        console.log(elem);
                        if (elem.data.type == "circle" ||
                            elem.data.type == "ellipse") {
                            elem.setAttribute ("cx", pos.x);
                            elem.setAttribute ("cy", pos.y);
                            outputElems.push (elem);
                        }
                        else {
                          if (elem.data.type == "rect") {
                            elem.setAttribute ("x", pos.x);
                            elem.setAttribute ("y", pos.y);
                            outputElems.push (elem);
                          }
                          else {
                            if (elem.data.type == "group") {
                              var translate = "translate ("+ pos.x +","+pos.y+")";
                              elem.setAttribute ("transform", translate);
                              outputElems.push (elem);
                            }
                          }
                        }
                      });
                      node.send({nrSvg: outputElems});
		                }
                    var duration = process.hrtime(start);
                    if (process.env.NODE_RED_FUNCTION_TIME) {
                        this.status({fill:"yellow",shape:"dot",text:""+Math.floor((duration[0]* 1e9 +  duration[1])/10000)/100});
                    }
                } catch(err) {
                    this.error(err.toString());
                }
            });
        } catch(err) {
            this.error(err);
          }
    }
    RED.nodes.registerType("XYModif",FunctionNode);
    // RED.library.register("functions");
}
