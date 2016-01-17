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
  this.content.polyPoints = PolygonGrammar.parse(text);
};

/*
 * Polylines don't accept x,y so we use the transform attribute
 */
Polyline.prototype.setPos = function (x,y) {
  this.parent.addTranslate.call (this, x, y);
};

Polyline.prototype.getCenter = function () {
  var center = Functions.NonIntersecPolCenter (this.content.polyPoints[0]);
  return center;
}

Polyline.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.polyPoints = new Array();
  this.content.polyPoints.forEach (function(item) {
    copy.content.polyPoints.push (item);
  });
  return Polyline.adapt (copy);
}

/**
* Clones the Polyline to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Polyline.prototype.cloneToCoords = function (coords)
{
  var polylines = [];
  for (var i = 0; i < coords.length; i++)
  {
    var pol = this.clone();
    pol.setPos (coords[i].x, coords[i].y);
    pol.applyTransform.call (pol, {rotate:{deg:coords[i].r}} );
    polylines.push (pol);
  }
  return polylines;
}

/**
 * Update the object coordinates
 * @param {object} coords - array of coords ({x:val, y:val})
 */
Polyline.prototype.updateCoords = function (coords)
{
  this.content.polyPoints = new Array();
  var newString = "";
  var that = this;
  coords.forEach (function (item) {
    that.content.polyPoints.push (item);
    newString += " " + item.x + "," + item.y;
  });
  this.parent.setAttribute.call (this, "points", newString);
  return this;
}

Polyline.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polyline.prototype);
}

exports.Polyline = Polyline;
