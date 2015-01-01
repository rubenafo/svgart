module.exports = function(RED) {
    var svg = require ("./svg.js");
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
            msg.nrSvg.coords.forEach (function (elem) {
              var circle = new svg.Circle (elem.x, elem.y, 40, "stroke:black;stroke-width:3;fill:red");
              elems[elems.length] = circle;
            });
            msg.nrSvg = elems;
            node.send (msg);
          }
          else {
	          var circle = new svg.Circle (0, 0, 40, "stroke:black;stroke-width:3;fill:red");
            msg.nrSvg = circle;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("circle", circleNode);
}
