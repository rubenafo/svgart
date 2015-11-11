/**
 * @license
 * Copyright 2014 Ruben Afonso, ruben@figurebelow.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
