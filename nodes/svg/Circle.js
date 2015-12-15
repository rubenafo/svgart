/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase.js").SVGBase;

Circle.type = "circle";
Circle.prototype = new SVGBase;
Circle.prototype.parent = SVGBase.prototype;

/**
* @class The SVG Circle element
* @constructor Circle
* @param {number} x - x coord
* @param {number} y - y coord
* @param {number} rd - radio value
* @param {string} style - CSS style string
* @param {number} zindex - zindex value
*/
Circle.prototype.constructor = Circle;
function Circle (x, y, rd, style, zindex) {
  SVGBase.call (this, Circle.type, zindex);
  this.parent.setAttribute.call (this, "r", rd);
  this.parent.setAttribute.call (this, "style", style);
  this.setPos (x,y);
};

/**
 * Returns the coords of the center of the circle
 * @returns - {x:value,y:value} containing the coords
 */
Circle.prototype.getCenter = function () {
	var x = this.parent.getAttribute.call (this, "cx");
	var y = this.parent.getAttribute.call (this, "cy");
	return ({x:x,y:y});
}

/**
 * Sets the position of the circle
 * @param {number} x - x coord
 * @param {number} y - y coord
 */
Circle.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "cx", x);
  this.parent.setAttribute.call (this, "cy", y);
};

/**
 * Adapts an object to the Circle class
 */
Circle.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Circle.prototype);
}

/**
 * Clones a Circle
 * @returns - a new Circle
 */
Circle.prototype.clone = function ()
{
  var clone = this.parent.clone.call (this);
  return Circle.adapt (clone);
}

/**
* Clones the Circle to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Circle.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var circle = this.clone ();
    circle.setPos (coords[i].x, coords[i].y);
    results.push (circle);
  }
  return results;
}

exports.Circle = Circle;
