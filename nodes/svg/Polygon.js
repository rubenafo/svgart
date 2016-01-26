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

Polygon.type = "polygon";
Polygon.prototype = new SVGBase ();
Polygon.prototype.parent = SVGBase.prototype;

Polygon.prototype.constructor = Polygon;
function Polygon (pointsStr, style, zindex) {
  SVGBase.call (this, Polygon.type, style, zindex, true);
  this.parent.setAttribute.call (this, "points", pointsStr);
  this.content.pointsList = PolygonGrammar.parse(pointsStr);
};

/*
 * Polygons don't accept x,y so we use the transform attribute
 */
Polygon.prototype.setPos = function (x,y) {
  var center = this.getCenter();
  var newStrPoints = "";
  var newX = (x - center.x);
  var newY = (y - center.y);
  for (var i = 0; i < this.content.pointsList.length; i++)
  {
    this.content.pointsList[i].x += newX;
    this.content.pointsList[i].y += newY;
    newStrPoints += this.content.pointsList[i].x + "," + this.content.pointsList[i].y + " ";
  }
  this.parent.setAttribute.call (this, "points", newStrPoints);
};

/**
 * Returns the center of the polygon using one of the standard algorithms for this.
 */
Polygon.prototype.getCenter = function () {
  var center = Functions.NonIntersecPolCenter (this.content.pointsList);
  return center;
}

Polygon.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.pointsList = new Array();
  this.content.pointsList.forEach (function(item) {
    copy.content.pointsList.push ({x:item.x, y:item.y});
  });
  return Polygon.adapt (copy);
}

/**
* Clones the Polygon to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Polygon.prototype.cloneToCoords = function (coords)
{
  var polygons = [];
  var that = this;
  coords.forEach (function (coord, i)
  {
    var pol = that.clone();
    pol.setPos (coord.x, coord.y);
    pol.applyTransform.call (pol, {rotate:{deg:coords[i].r}} );
    polygons.push (pol);

  });
  return polygons;
}

/**
* Update the object coordinates
* @param {object} coords - array of coords ({x:val, y:val})
*/
Polygon.prototype.updateCoords = function (coords)
{
  this.content.pointsList = new Array();
  var newString = "";
  var that = this;
  coords.forEach (function (item) {
    that.content.pointsList.push (item);
    newString += " " + item.x + "," + item.y;
  });
  this.parent.setAttribute.call (this, "points", newString);
  return this;
}

Polygon.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polygon.prototype);
}

exports.Polygon = Polygon;
