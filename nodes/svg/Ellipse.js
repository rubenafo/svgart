/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase.js").SVGBase;

Ellipse.type = "ellipse";
Ellipse.prototype = new SVGBase ();
Ellipse.prototype.parent = SVGBase.prototype;

/**
* @class The SVG Ellipse element
* @constructor Ellipse
* @param {number} cx - x coord
* @param {number} cy - y coord
* @param {number} rx - x-radio value
* @param {number} ry - y-radio value
* @param {string} style - CSS style string
* @param {number} zindex - zindex value
*/
Ellipse.prototype.constructor = Ellipse;
function Ellipse (cx, cy, rxStr, ryStr, style, zindex) {
  SVGBase.call (this, Ellipse.type, zindex);
  this.setPos (cx, cy);
  this.parent.setGenerator.call (this, "rx", rxStr);
  this.parent.setGenerator.call (this, "ry", ryStr);
  this.parent.setAttribute.call (this, "style", style);
};

/**
* Sets the position of the ellipse
* @param {number} x - x coord
* @param {number} y - y coord
*/
Ellipse.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "cx", x);
  this.parent.setAttribute.call (this, "cy", y);
};

/**
* Returns the coords of the center of the ellipse
* @returns - {x:value,y:value} containing the coords
*/
Ellipse.prototype.getCenter = function () {
	var x = this.parent.getAttribute.call (this, "cx");
	var y = this.parent.getAttribute.call (this, "cy");
	return ({x:x,y:y});
}

/**
* Adapts an object to the Ellipse class
*/
Ellipse.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Ellipse.prototype);
}

/**
* Clones an Ellipse
* @returns - a new Ellipse
*/
Ellipse.prototype.clone = function ()
{
  var clone = this.parent.clone.call (this);
  return Ellipse.adapt (clone);
}

/**
* Clones the Ellipse to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Ellipse.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var ellipse = this.clone ();
    ellipse.setPos (coords[i].x, coords[i].y);
    if (coords[i].r)
      ellipse.applyTransform.call(ellipse, {rotate:{deg:coords[i].r}} );
    results.push (ellipse);
  }
  return results;
}

exports.Ellipse = Ellipse;
