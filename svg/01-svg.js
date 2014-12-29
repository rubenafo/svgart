module.exports = function(RED) {
    var vm = require ("vm");
    var svg = require ("./svg.js");
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var customStyle = config.func;
        this.on('input', function(msg) {
          if (msg.nrSvg) {
            var svgDoc = new svg.SVG (config.width, config.height, customStyle);
            msg.payload = svgDoc.toString (msg.nrSvg);
            this.send(msg);
          }
        });
    };
    RED.nodes.registerType("svg",LowerCaseNode);
}
