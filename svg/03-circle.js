module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
            msg.nrSvg.coords.forEach (function (elem) {
              var circle = "<circle cx=\"" + elem.x + "\" cy=\"" + elem.y + "\" r=\"40\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />";
              elems[elems.length] = circle;
            });
            msg.payload = elems;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("circle", circleNode);
}
