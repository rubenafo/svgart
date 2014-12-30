module.exports = function(RED) {
  var svg = require ("./svg.js");
  function circleNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {
      if (msg.nrSvg && msg.nrSvg.coords) {
        var elems = new Array();
        msg.nrSvg.coords.forEach (function (elem) {
          var ellipse = new svg.Ellipse (elem.x, elem.y, 10, 20, "fill:yellow;stroke:purple;stroke-width:2");
          elems[elems.length] = ellipse;
        });
        msg.nrSvg = elems;
        node.send (msg);
      }
      else {
        var ellipse = new svg.Ellipse (10, 20, 10, 20, "fill:yellow;stroke:purple;stroke-width:2");
        msg.nrSvg = ellipse;
        node.send (msg);
      }
    });
  };
  RED.nodes.registerType("ellipse", circleNode);
}
