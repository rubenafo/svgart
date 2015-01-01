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
