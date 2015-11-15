/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase").SVGBase;

Text.type = "text";
Text.prototype = new SVGBase ();
Text.prototype.parent = SVGBase.prototype;

Text.prototype.constructor = Text;
function Text (x, y, text, style, zindex) {
  SVGBase.call (this, Text.type, zindex);
  this.setPos (x, y);
  this.setString (text);
  this.parent.setAttribute.call (this, "style", style);
};

Text.prototype.setString = function (text) {
  this.content.string = text;
};

Text.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "x", x);
  this.parent.setAttribute.call (this, "y", y);
};

Text.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.string = this.content.string;
  return copy;
}

Text.prototype.toSVG = function () {
  return this.parent.toSVG.call (this, this.content.string);
};

Text.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Text.prototype);
}

exports.Text = Text;
