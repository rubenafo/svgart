/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

module.exports = function(RED) {
    var SVG = require ("./svg/Svg").SVG;
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var customStyle = config.func;
        this.on('input', function(msg) {
            if (msg.nrSvg) {
                var svgDoc = new SVG (config.width, config.height, customStyle);
                if (msg.nrSvg.constructor === Array) {
                    var svgString = new String ();
                    msg.nrSvg.forEach (function (item) {
                      var svgElem = SVGadapter (item);
                      svgString += svgElem.toSVG();
                    });
                    msg.payload = svgDoc.toSVG (svgString);
                }
                else {
                    var svgElem = SVGadapter (msg.nrSvg);
                    var svgString = svgElem.toSVG();
                    msg.payload = svgDoc.toSVG (svgString);
                }
                this.send(msg);
            }
        });
    };
    RED.nodes.registerType("svg",LowerCaseNode);
}
