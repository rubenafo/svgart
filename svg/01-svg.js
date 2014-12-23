module.exports = function(RED) {
    var vm = require ("vm");
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var context = vm.createContext ();
        context.count = context.count || 0;
        context.data = context.data || [];
        this.on('input', function(msg) {
          if (msg.nrSvg) {
            var svgHeaderBegin = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> " +
  				    "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" " +
     					"xmlns:cc=\"http://creativecommons.org/ns#\" " +
     					"xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" " +
     					"xmlns:svg=\"http://www.w3.org/2000/svg\" " +
     					"xmlns=\"http://www.w3.org/2000/svg\" " +
     					"xmlns:xlink=\"http://www.w3.org/1999/xlink\" " +
              "width=\"" + config.width + "\" " +
     					"height=\"" + config.height + "\" " +
              "id=\"svg2\" version=\"1.1\">";
     			  var svgHeaderEnd = "</svg>";
            if (context.count < 2) {
              node.send (null);
              context.data.push (msg.nrSvg);
              context.count = context.count + 1;
            }
            if (context.count == 2) {
              msg.payload = svgHeaderBegin;
              context.data.forEach (function (elem) {
                msg.payload += elem;
              });
              msg.payload += svgHeaderEnd;
              node.send(msg);
              context.count = 0;
              context.data = [];
            }
          }
       });
    };
    RED.nodes.registerType("svg",LowerCaseNode);
}
