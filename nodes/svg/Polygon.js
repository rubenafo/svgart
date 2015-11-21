/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase.js").SVGBase;
var PolygonGrammar = require ("./grammars/PolygonGrammar");

Polygon.type = "polygon";
Polygon.prototype = new SVGBase ();
Polygon.prototype.parent = SVGBase.prototype;

Polygon.prototype.constructor = Polygon;
function Polygon (pointsStr, style, zindex) {
  SVGBase.call (this, Polygon.type, zindex, true);
  this.parent.setAttribute.call (this, "points", pointsStr);
  this.content.pointsList = PolygonGrammar.parse(pointsStr);
  this.parent.setAttribute.call (this, "style", style);
};

/*
 * Polygons don't accept x,y so we use the transform attribute
 */
Polygon.prototype.setPos = function (x,y) {
  this.parent.addTranslate.call (this, x, y);
};

/**
 * Returns the center of the polygon using one of the standard algorithms for this.
 */
Polygon.prototype.getCenter = function () {
  var center = NonIntersecPolCenter (this.content.pointsList[0]);
  return center;
}

Polygon.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.pointsList = new Array();
  this.content.pointsList.forEach (function(item) {
    copy.content.pointsList.push (item);
  });
  return copy;
}

/**
* Clones the Polygon to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Polygon.prototype.cloneToCoords = function (coords)
{
  // TODO to be implemented, this should clone all the
}

/**
* Update the object coordinates
* @param {object} coords - array of coords ({x:val, y:val})
*/
Polygon.prototype.updateCoords = function (coords)
{
  /*TODO this.content.pointsList = new Array();
  var newString = "";
  var that = this;
  coords.forEach (function (item) {
    that.content.pointsList.push (item);
    newString += " " + item.x + "," + item.y;
  });
  this.parent.setAttribute.call (this, "points", newString);
  return this;*/
}

Polygon.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polygon.prototype);
}

exports.Polygon = Polygon;
