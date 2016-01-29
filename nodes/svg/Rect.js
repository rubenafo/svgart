/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

 // Rect element ////////////////////////

var SVGBase = require ("./SVGBase.js").SVGBase;

Rect.type = "rect";
Rect.prototype = new SVGBase ();
Rect.prototype.parent = SVGBase.prototype;

Rect.prototype.constructor = Rect;
function Rect (x, y, widthStr, heightStr, style, zindex) {
  SVGBase.call (this, Rect.type, style, zindex, true);
  this.parent.setGenerator.call (this, "width", widthStr);
  this.parent.setGenerator.call (this, "height", heightStr);
  this.setPos (x, y);
};

Rect.prototype.setPos = function (x,y) {
  var width = this.parent.getAttribute.call (this, "width");
  var height= this.parent.getAttribute.call (this, "height");
  this.parent.setAttribute.call (this, "x", x - width/2);
  this.parent.setAttribute.call (this, "y", y - height/2);
};

Rect.prototype.getCenter = function () {
  var x = this.parent.getAttribute.call (this, "x");
  var y = this.parent.getAttribute.call (this, "y");
  var width = this.parent.getAttribute.call (this, "width");
  var height= this.parent.getAttribute.call (this, "height");
  return ({x: x + width/2, y: y + height/2});
}

/**
* Clones a Rectangle
* @returns - a new Rectangle object
*/
Rect.prototype.clone = function ()
{
  var clone = this.parent.clone.call (this);
  return Rect.adapt (clone);
}

/**
* Clones the Rectangle to the given coords array, using each coord pair
* as points for the rectangle
* @param {object} coords - array of coords ({x:val,y:val})
*/
Rect.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var rect = this.clone ();
    rect.setPos (coords[i].x, coords[i].y);
    results.push(rect);
  }
  return results;
}

Rect.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Rect.prototype);
}

exports.Rect = Rect;
