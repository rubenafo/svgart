/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVG = require ("./Svg").SVG;
var Circle = require ("./Circle").Circle;
var Ellipse = require ("./Ellipse").Ellipse;
var Group = require ("./Group").Group;
var Rect = require ("./Rect").Rect;
var Line = require ("./Line").Line;
var Text = require ("./Text").Text;
var Polygon = require ("./Polygon").Polygon;
var Polyline = require ("./Polyline").Polyline;
var Path = require ("./Path").Path;

SVGadapter = function (elem) {
  if (elem.content && elem.content.type) {
    var type = elem.content.type;
    switch (type) {
      case SVG.type: return SVG.adapt (elem);
      case Circle.type: return Circle.adapt (elem);
      case Ellipse.type: return Ellipse.adapt (elem);
      case Group.type: return Group.adapt (elem);
      case Rect.type: return Rect.adapt (elem);
      case Line.type: return Line.adapt (elem);
      case Text.type: return Text.adapt (elem);
      case Polygon.type: return Polygon.adapt (elem);
      case Polyline.type: return Polyline.adapt (elem);
      case Path.type: return Path.adapt (elem);
    }
  }
  console.log ("Undefined type casting " + elem);
  return elem;
};

OrderByZIndex = function (a, b) {
  a = SVGadapter (a);
  b = SVGadapter (b);
  if (a.getZIndex() && b.getZIndex()) {
    return a.getZIndex() - b.getZIndex();
  }
  return 0; // unchanged
};

//
// Taken from stackoverflow:
// http://stackoverflow.com/questions/521295/javascript-random-seeds
//
RandomGen = function(s) {
  s = s || Math.random ();
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

/*
 * Center of a non-intersecting polygon,
 * as described in http://en.wikipedia.org/wiki/Centroid#Centroid_of_polygon
 * - parameters: vertices: {x,y} vertices list
 */
NonIntersecPolCenter = function (pts) {
  var first = pts[0], last = pts[pts.length-1];
  if (first.x != last.x || first.y != last.y) pts.push(first);
  var twicearea=0, x=0, y=0, nPts = pts.length, p1, p2, f;
  for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
    p1 = pts[i]; p2 = pts[j];
    f = p1.x*p2.y - p2.x*p1.y;
    twicearea += f;
    x += ( p1.x + p2.x ) * f;
    y += ( p1.y + p2.y ) * f;
  }
  f = twicearea * 3;
  return { x:x/f, y:y/f };
};

/*
 * Determines the angle of a straight line drawn between point one and two.
 * The number returned, which is a float in degrees, tells us how much we have
 * to rotate a horizontal line clockwise for it to match the line between the
 * two points.
 */
calculateAngle = function (point1, point2)
{
  var xDiff = point2.x - point1.x;
  var yDiff = point2.y - point1.y;
  return Math.atan2 (yDiff, xDiff) * (180 / Math.PI);
}

exports.SVGadapter = SVGadapter;
exports.OrderByZIndex = OrderByZIndex;
exports.RandomGen = RandomGen;
exports.calculateAngle = calculateAngle;
