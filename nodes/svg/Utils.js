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

exports.SVGadapter = SVGadapter;
exports.OrderByZIndex = OrderByZIndex;
