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

Polygon.type = "polygon";
Polygon.prototype = new SVGBase;
Polygon.prototype.parent = SVGBase.prototype;

Polygon.prototype.constructor = Polygon;
function Polygon (text, style, zindex) {
  SVGBase.call (this, Polygon.type, zindex);
  this.parent.setAttribute.call (this, "points", text);
  this.parent.setAttribute.call (this, "style", style);
};

/* 
 * Polygons don't accept x,y so we use the transform attribute
 */
Polygon.prototype.setPos = function (x,y) {
  this.parent.addTranslate.call (this, x, y);
};

Polygon.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Polygon.prototype);
}

exports.Polygon = Polygon;