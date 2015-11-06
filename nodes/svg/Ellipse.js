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
function Ellipse (cx, cy, rx, ry, style, zindex) {
  SVGBase.call (this, Ellipse.type, zindex);
  this.setPos (cx, cy);
  this.parent.setAttribute.call (this, "rx", rx);
  this.parent.setAttribute.call (this, "ry", ry);
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
	var x = this.parent.getAttribute ("cx");
	var y = this.parent.getAttribute ("cy");
	return ({x:x/2,y:y/2});
}

/**
* Adapts an object to the Ellipse class
*/
Ellipse.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Ellipse.prototype);
}

exports.Ellipse = Ellipse;
