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
  //this.content.string = text;
  this.parent.setAttribute.call (this, "string", text);
};

Text.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "x", x);
  this.parent.setAttribute.call (this, "y", y);
};

Text.prototype.clone = function () {
  var clone = this.parent.clone.call (this);
  return Text.adapt (clone);
}

Text.prototype.toSVG = function () {
  return this.parent.toSVG.call (this, this.content.string);
};

/**
* Clones the Rectangle to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Text.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var txt = this.clone ();
    txt.setPos (coords[i].x, coords[i].y);
    results.push (txt);
  }
  return results;
}

Text.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Text.prototype);
}

exports.Text = Text;
