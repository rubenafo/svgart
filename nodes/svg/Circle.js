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
  this.setPos (x,y);
  this.parent.setAttribute.call (this, "r", rd);
  this.parent.setAttribute.call (this, "style", style);
};

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
 * Returns the coords of the center of the circle
 * @returns - {x:value,y:value} containing the coords
 */
Circle.prototype.getCenter = function () {
	var x = this.parent.getAttribute ("cx");
	var y = this.parent.getAttribute ("cy");
	return ({x:x/2,y:y/2});
}

/**
 * Adapts an object to the Circle class
 */
Circle.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Circle.prototype);
}

exports.Circle = Circle;
