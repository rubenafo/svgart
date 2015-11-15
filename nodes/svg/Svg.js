/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

// SVG element /////////////////////////

var SVGBase = require ("./SVGBase").SVGBase;

SVG.type = "svg";
SVG.prototype = new SVGBase;
SVG.prototype.parent = SVGBase.prototype;

SVG.prototype.constructor = SVG;
function SVG (width, height, style) {
	SVGBase.call (this, "svg");
  this.parent.setAttribute.call (this, "width", width);
  this.parent.setAttribute.call (this, "height", height);
  this.parent.setAttribute.call (this, "version", "1.1");
  this.parent.setAttribute.call (this, "encoding", "UTF-8");
  this.parent.setAttribute.call (this, "standalone", "no");
  this.parent.setAttribute.call (this, "xmlns:cc", "http://creativecommons.org/ns#");
  this.parent.setAttribute.call (this, "xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  this.parent.setAttribute.call (this, "xmlns:svg", "http://www.w3.org/2000/svg");
  this.parent.setAttribute.call (this, "xmlns", "http://www.w3.org/2000/svg");
  this.parent.setAttribute.call (this, "xmlns:xlink", "http://www.w3.org/1999/xlink");

  // It takes the style to create a rectangle and use it as a background
  this.backgroundStyle = style;
};

SVG.prototype.toSVG = function (content) {
	if (this.backgroundStyle && this.backgroundStyle.trim()) {
    var backgroundRect = "<rect x=\"0\" y=\"0\" width=\"" + this.content.width +
                           "\" height=\"" + this.content.height + "\" " +
                           "style=\"" + this.backgroundStyle + "\"></rect>";
    content = backgroundRect + content;
  };
  return this.parent.toSVG.call (this, content);
};

SVG.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, SVG.prototype);
}

module.exports.SVG = SVG;
