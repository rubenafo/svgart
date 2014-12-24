module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
            msg.nrSvg.coords.forEach (function (elem) {
	      var ellipse = "<ellipse cx=\"" + elem.x + "\" cy=\""+ elem.y + "\" rx=\"10\" ry=\"20\"" +
                      " style=\"fill:yellow;stroke:purple;stroke-width:2\" />";
              elems[elems.length] = ellipse;
            });
            msg.nrSvg = elems;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("ellipse", circleNode);
}
