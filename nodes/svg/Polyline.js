/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase.js").SVGBase;
var PolygonGrammar = require ("./grammars/PolygonGrammar");
var Functions = require ("./Functions");

Polyline.type = "polyline";
Polyline.prototype = new SVGBase;
Polyline.prototype.parent = SVGBase.prototype;

Polyline.prototype.constructor = Polyline;
function Polyline (text, style, zindex) {
  SVGBase.call (this, Polyline.type, style, zindex, true);
  this.parent.setAttribute.call (this, "points", text);
  this.content.polyPoints = PolygonGrammar.parse(text)[0];
};

/*
 * Polylines don't accept x,y so we use the transform attribute
 */
Polyline.prototype.setPos = function (x,y) {
  var center = this.getCenter();
  var newStrPoints = "";
  var newX = (x - center.x);
  var newY = (y - center.y);
  for (var i = 0; i < this.content.polyPoints.length; i++)
  {
    this.content.polyPoints[i].x += newX;
    this.content.polyPoints[i].y += newY;
    newStrPoints += this.content.polyPoints[i].x + "," + this.content.polyPoints[i].y + " ";
  }
  this.parent.setAttribute.call (this, "points", newStrPoints);
};

Polyline.prototype.getCenter = function () {
  var center = Functions.NonIntersecPolCenter (this.content.polyPoints);
  return center;
}

Polyline.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.polyPoints = new Array();
  this.content.polyPoints.forEach (function(item) {
    copy.content.polyPoints.push ({x:item.x, y:item.y});
  });
  return Polyline.adapt (copy);
}

/**
* Clones the Polyline to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
* @returns {object} polys - list of polylines at the coords given
*/
Polyline.prototype.cloneToCoords = function (coords)
{
  var polylines = [];
  var that = this;
  coords.forEach (function (coord, i)
  {
    var pol = that.clone();
    pol.setPos (coord.x, coord.y);
    pol.applyTransform.call (pol, {rotate:{deg:coords[i].r}} );
    polylines.push (pol);

  });
  return polylines;
}

/**
 * Update the object coordinates
 * @param {object} coords - array of coords ({x:val, y:val})
 * @returns {object} - the polyline updated to the given coords
 */
Polyline.prototype.updateCoords = function (coords)
{
  this.content.polyPoints = new Array();
  var newString = "";
  var that = this;
  coords.forEach (function (point) {
    that.content.polyPoints.push (point);
    newString += " " + point.x + "," + point.y;
  });
  this.parent.setAttribute.call (this, "points", newString);
  return this;
}

Polyline.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polyline.prototype);
}

exports.Polyline = Polyline;
