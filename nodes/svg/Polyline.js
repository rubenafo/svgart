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

var SVGBase = require ("./SVGBase.js").SVGBase;
var PolygonGrammar = require ("./grammars/PolygonGrammar");

Polyline.type = "polyline";
Polyline.prototype = new SVGBase;
Polyline.prototype.parent = SVGBase.prototype;

Polyline.prototype.constructor = Polyline;
function Polyline (text, style, zindex) {
  SVGBase.call (this, Polyline.type, zindex);
  this.parent.setAttribute.call (this, "points", text);
  this.content.polyPoints = PolygonGrammar.parse(text);
  this.parent.setAttribute.call (this, "style", style);
};

/* 
 * Polylines don't accept x,y so we use the transform attribute
 */
Polyline.prototype.setPos = function (x,y) {
  this.parent.addTranslate.call (this, x, y);
};

Polyline.prototype.getCenter = function () {
  var center = NonIntersecPolCenter (this.content.polyPoints[0]);
  return center;
}

Polyline.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.polyPoints = new Array();
  this.content.polyPoints.forEach (function(item) {
    copy.content.polyPoints.push (item);
  });
  return copy;
}

Polyline.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polyline.prototype);
}

exports.Polyline = Polyline;