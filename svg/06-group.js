module.exports = function(RED) {
    var vm = require ("vm");
    function GroupFunction (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var context = vm.createContext ();
        context.count = context.count || 0;
        context.data = context.data || [];
        var elemsToGroup = config.elems;
        this.on('input', function(msg) {
          if (msg.nrSvg) {
            var svgHeaderBegin = "<g>";
            var svgHeaderEnd = "</g>";
            if (context.count < elemsToGroup) {
              node.send (null);
              context.data.push (msg.nrSvg);
              context.count++;
            }
            if (context.count == elemsToGroup) { // waiting is over, send!
              msg.nrSvg = svgHeaderBegin;
              context.data.forEach (function (elem) {
                msg.nrSvg += elem;
              });
              msg.nrSvg += svgHeaderEnd;
              node.send(msg);
              context.count = 0;
              context.data = [];
            }
          }
       });
    };
    RED.nodes.registerType("group", GroupFunction);
}
