module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
        	var svgHeaderBegin = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> \
				<svg \
   					xmlns:dc=\"http://purl.org/dc/elements/1.1/\"  \
   					xmlns:cc=\"http://creativecommons.org/ns#\"  \
   					xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"  \
   					xmlns:svg=\"http://www.w3.org/2000/svg\"  \
   					xmlns=\"http://www.w3.org/2000/svg\"  \
   					xmlns:xlink=\"http://www.w3.org/1999/xlink\"  \
   					width=\"744.09448819\"  \
   					height=\"1052.3622047\"  \
   					id=\"svg2\"  \
   					version=\"1.1\">";
   			var svgHeaderEnd = "</svg>";
   			if (msg.payload)
   			{
   				msg.payload = svgHeaderBegin + msg.payload + svgHeaderEnd;
   			}
   			else 
   			{
   				msg.payload = svgHeaderBegin + svgHeaderEnd;
   			}
            node.send(msg);
		});
    };
    RED.nodes.registerType("svg",LowerCaseNode);
}
