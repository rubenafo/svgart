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

// Path element

var SVGBase = require ("./SVGBase").SVGBase;
var PathGrammar = require ("./grammars/PathGrammar");

Path.type = "path";
Path.prototype = new SVGBase ();
Path.prototype.parent = SVGBase.prototype;

/**
* @class The SVG Path element
* @constructor Circle
* @param {number} d - Path's d attribute
* @param {string} style - CSS style string
* @param {number} zindex - zindex value
*/
Path.prototype.constructor = Path;
function Path (d, style, zindex) {
  SVGBase.call (this, Path.type, zindex);
  this.parent.setAttribute.call (this, "d", d);
  this.content.pathPoints = PathGrammar.parse(d);
  this.parent.setAttribute.call (this, "style", style);
};

/**
* Sets the position of the Path.
* @param {number} x - x coord
* @param {number} y - y coord
*/
Path.prototype.setPos = function (x,y) {
  // Paths don't have x,y so we use the transform
  this.parent.addTranslate.call (this, x, y);
};

/**
* Returns the coords of the center of the Path.
* The center is calculated by calculating the centroid of all
* the vertices.
* @returns - {x:value,y:value} containing the coords
*/
Path.prototype.getCenter = function () {
  var vertices = [];
  this.content.pathPoints.forEach (function (instruction) {
  	if (instruction.values)
  		instruction.values.forEach (function (point) {
  			vertices.push (point);
  		});
  });
  var center = NonIntersecPolCenter (vertices);
  return center;
}

/**
 * Returns a noew instance of a Path
 * @returns a new Path.
 */
Path.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.pathPoints = new Array();
  this.content.pathPoints.forEach (function(item) {
    copy.content.pathPoints.push (item);
  });
  return copy;
}

/**
* Adapts an object to the Path class
*/
Path.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Path.prototype);
}

exports.Path = Path;
