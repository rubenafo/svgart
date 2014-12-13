module.exports = function(RED) {
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        msg.payload = "\<rect width=\"300\" height=\"100\" " +
                      "style=\"fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)\" /> ";
        node.send(msg);
        });
    };
    RED.nodes.registerType("rect", circleNode);
}
