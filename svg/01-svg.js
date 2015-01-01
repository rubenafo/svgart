/**
 * Copyright 2014 Ruben Afonso, ruben@figurebelow.com
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
    var vm = require ("vm");
    var svg = require ("./svg.js");
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var customStyle = config.func;
        this.on('input', function(msg) {
            if (msg.nrSvg) {
                var svgDoc = new svg.SVG (config.width, config.height, customStyle);
                if (msg.nrSvg.constructor === Array) {
                    var svgString = new String ();
                    msg.nrSvg.forEach (function (item) {
                        svgString += item.toSVG();
                    });
                    msg.payload = svgDoc.toSVG (svgString);
                }
                else {
                    console.log("one");
                    msg.payload = svgDoc.toSVG (msg.nrSvg);
                }
                this.send(msg);
            }
        });
    };
    RED.nodes.registerType("svg",LowerCaseNode);
}
