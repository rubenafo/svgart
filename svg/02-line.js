module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        msg.payload = "<line x1=\"0\" y1=\"0\" x2=\"200\" y2=\"200\" " + 
                      "style=\"stroke:rgb(255,0,0);stroke-width:2\" />";
        node.send(msg);
        });
    };
    RED.nodes.registerType("line", circleNode);
}
