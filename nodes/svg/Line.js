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

// Line element ////////////////////////

var SVGBase = require ("./SvgBase").SVGBase;

Line.type = "line";
Line.prototype = new SVGBase ();
Line.prototype.parent = SVGBase.prototype;

Line.prototype.constructor = Line;
function Line (x1, y1, x2, y2, style, zindex) {
  SVGBase.call (this, Line.type, zindex);
  this.setCoords (x1, y1, x2, y2);
  this.parent.setAttribute.call (this, "style", style);
};

Line.prototype.setCoords = function (x1, y1, x2, y2) {
  this.parent.setAttribute.call (this, "x1", x1);
  this.parent.setAttribute.call (this, "y1", y1);
  this.parent.setAttribute.call (this, "x2", x2);
  this.parent.setAttribute.call (this, "y2", y2);
};

Line.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Line.prototype);
}

exports.Line = Line;