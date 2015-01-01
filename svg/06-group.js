module.exports = function(RED) {
    var vm = require ("vm");
    var svg = require ("./svg.js");
    function GroupFunction (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var context = vm.createContext ();
        context.data = context.data || [];
        var elemsToGroup = config.elems;
        this.on('input', function(msg) {
          if (msg.nrSvg) {
            if (context.data.length < elemsToGroup) {
              node.send (null);
              context.data.push (msg.nrSvg);
            }
            if (context.data.length == elemsToGroup) { // waiting is over, send!
              var group = new svg.Group ();
              context.data.forEach (function (elem) {
                group.addChild (elem);
              });
              msg.nrSvg = group;
              node.send(msg);
              context.data = [];
            }
          }
       });
    };
    RED.nodes.registerType("group", GroupFunction);
}