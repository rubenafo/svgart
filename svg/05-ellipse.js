module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        msg.payload = "<ellipse cx=\"200\" cy=\"80\" rx=\"100\" ry=\"50\"" +
                      " style=\"fill:yellow;stroke:purple;stroke-width:2\" />";
        node.send(msg);
        });
    };
    RED.nodes.registerType("ellipse", circleNode);
}
