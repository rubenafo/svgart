/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

module.exports = function(RED) {
    "use strict";
    var util = require("util");
    var vm = require("vm");
    var SVGadapter = require ("./svg/Utils.js").SVGadapter;
    var Generators = require ("./svg/gens/Attractor.js");

    function FunctionNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.func = n.func;
        var functionText = "var results = null; results = (function(msg){"+this.func + "\n})(msg);";
        this.topic = n.topic;
        var sandbox = {
            console:console,
            util:util,
            Buffer:Buffer,
            require:require,
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
                    var outputElems = new Array();
                    var node = this;
                    if (msg.nrSvg && results) {
                        var cp = undefined;
                        cp = msg.nrSvg.length != undefined ? msg.nrSvg[0] : msg.nrSvg;
                        results.forEach (function (pos) {
                            var elem = cp.clone();
                            elem = SVGadapter (elem);
                            if (elem.content.type == "line")
                            {
                                var current = results.indexOf (pos);
                                if (current != 0)
                                    elem.setCoords (results[current-1], pos);
                            }
                            else {
                                //elem.applyTransform (pos);
                                elem.setPos (pos.x, pos.y);
                            }
                            outputElems.push (elem);
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
