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
                      jsdom.env ({
                        html: msg.nrSvg,
                        scripts: ["http://code.jquery.com/jquery-1.6.min.js"],
                        done: function (err, window) {
                           var svgElems = window.$("body").children();
                           var svgInputElem = svgElems.get(0);
                           results.forEach (function (pos) {
                              if (svgInputElem.tagName.toLowerCase() == "circle" ||
                                  svgInputElem.tagName.toLowerCase() == "ellipse") {
                                svgInputElem.setAttribute ("cx", pos.x);
                                svgInputElem.setAttribute ("cy", pos.y);
                                outputElems.push (svgInputElem.outerHTML);
                              }
                              else {
                                var elemName = svgInputElem.tagName.toLowerCase();
                                console.log ("elem name = " + elemName);
                                if (elemName == "rect") {
                                  svgInputElem.setAttribute ("x", pos.x);
                                  svgInputElem.setAttribute ("y", pos.y);
                                  outputElems.push (svgInputElem.outerHTML);
                                }
                                else {
                                  if (elemName == "g") {
                                      var translate = "translate ("+ pos.x +","+pos.y+")";
                                      svgInputElem.setAttribute ("transform", translate);
                                      outputElems.push (svgInputElem.outerHTML);
                                  }
                                }
                              }
                           });
		           node.send({nrSvg: outputElems});
                         }
                      });
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
