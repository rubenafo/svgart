module.exports = function(RED) {
    var vm = require ("vm");
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
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
              msg.payload = svgHeaderBegin + msg.nrSvg + svgHeaderEnd;
              this.send(msg);
            }
          });
       };
    RED.nodes.registerType("svg",LowerCaseNode);
}
