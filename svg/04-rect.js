module.exports = function(RED) {
    var svg = require ("./svg.js");
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var rect = new svg.Rect (0, 0, 300, 100, "fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)");
            msg.nrSvg = rect;
            node.send(msg);
        });
    };
    RED.nodes.registerType("rect", circleNode);
}
