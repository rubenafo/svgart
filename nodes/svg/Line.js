/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
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
  this.parent.setAttribute.call (this, "x1", sourceCoord.x);
  this.parent.setAttribute.call (this, "y1", sourceCoord.y);
  this.parent.setAttribute.call (this, "x2", targetCoord.x);
  this.parent.setAttribute.call (this, "y2", targetCoord.y);
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

/**
* Clones a Line
* @returns - a new Line
*/
Line.prototype.clone = function ()
{
  var clone = this.parent.clone.call (this);
  return Line.adapt (clone);
}

/**
* Clones the Line to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Line.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    if (i)
    {
      var line = this.clone ();
      line.setCoords (coords[i], coords[i-1]);
      results.push (line);
    }
  }
  return results;
}

exports.Line = Line;
