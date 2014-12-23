module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
              for (var i = 0; i < msg.nrSvg.coords.length-1; i++) {
                var line = "<line x1=\"" + msg.nrSvg.coords[i].x + "\" y1=\"" + msg.nrSvg.coords[i].y +
                           "\" x2=\"" + msg.nrSvg.coords[i+1].x + "\" y2=\"" + msg.nrSvg.coords[i+1].y +
                           "\" " + "style=\"stroke:rgb(255,0,0);stroke-width:3\" />";
                elems[elems.length] = line;
              };
            msg.nrSvg = elems;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("line", circleNode);
}
