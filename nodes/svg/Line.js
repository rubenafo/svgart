/**
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

// Line element ////////////////////////

var SVGBase = require ("./SVGBase").SVGBase;

Line.type = "line";
Line.prototype = new SVGBase ();
Line.prototype.parent = SVGBase.prototype;

/**
* @class The SVG Line element
* @constructor Line
* @param {number} x1 - source point's x coord
* @param {number} y1 - source point's y coord
* @param {number} x2 - end point's x coord
* @param {number} yy - end point's y coord
* @param {string} style - CSS style string
* @param {number} zindex - zindex value
*/
Line.prototype.constructor = Line;
function Line (x1, y1, x2, y2, style, zindex) {
  SVGBase.call (this, Line.type, zindex);
  this.setCoords (x1, y1, x2, y2);
  this.parent.setAttribute.call (this, "style", style);
};

/**
* Sets the coords of the Line
* @param {number} sourceCoord - source point ({xpos:value, ypos:value})
* @param {number} targetCoord - destination point ({xpos:value, ypos:value})
*/
Line.prototype.setCoords = function (sourceCoord, targetCoord) {
  console.log(sourceCoord, targetCoord);
  this.parent.setAttribute.call (this, "x1", sourceCoord.xpos);
  this.parent.setAttribute.call (this, "y1", sourceCoord.ypos);
  this.parent.setAttribute.call (this, "x2", targetCoord.xpos);
  this.parent.setAttribute.call (this, "y2", targetCoord.ypos);
};

/**
* Returns the coords of the center of the Line.
* @returns - {x:value,y:value} containing the coords
*/
Line.prototype.getCenter = function () {
  var x1 = this.parent.getAttribute("x1");
  var x2 = this.parent.getAttribute("x2");
  var y1 = this.parent.getAttribute("y1");
  var y2 = this.parent.getAttribute("y2");
  return ({x: (x1+x2)/2, y: (y1+y2)/2 });
}

/**
* Adapts an object to the Line class
*/
Line.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Line.prototype);
}

exports.Line = Line;
