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
NonIntersecPolCenter = function (vertices) {
  var centroid = {x:0, y:0};
  var x0, y0, x1, y1, signedArea = 0;
  var i = 0;
  for (i=0; i < vertices.length-1; ++i) {
    x0 = vertices[i].x;
    y0 = vertices[i].y;
    x1 = vertices[i+1].x;
    y1 = vertices[i+1].y;
    a = x0*y1 - x1*y0;
    signedArea += a;
    centroid.x += (x0 + x1)*a;
    centroid.y += (y0 + y1)*a;
  }

  a = x0*y1 - x1*y0; // last vertex
  signedArea += a;
  signedArea *= 0.5; // A
  // Do last vertex
  x0 = vertices[i].x;
  y0 = vertices[i].y;
  x1 = vertices[0].x;
  y1 = vertices[0].y;
  centroid.x += (x0 + x1)*a;
  centroid.y += (y0 + y1)*a;
  centroid.x /= (6.0*signedArea);
  centroid.y /= (6.0*signedArea);
  return centroid;
};

exports.SVGadapter = SVGadapter;
exports.OrderByZIndex = OrderByZIndex;
exports.RandomGen = RandomGen;
