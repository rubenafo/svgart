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

// Circle element //////////////////////

var SVGBase = require ("./SVGBase.js").SVGBase;

Circle.type = "circle";
Circle.prototype = new SVGBase;
Circle.prototype.parent = SVGBase.prototype;

Circle.prototype.constructor = Circle;
function Circle (x, y, rd, style, zindex) {
  SVGBase.call (this, Circle.type, zindex);
  this.setPos (x,y);
  this.parent.setAttribute.call (this, "r", rd);
  this.parent.setAttribute.call (this, "style", style);
};

Circle.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "cx", x); 
  this.parent.setAttribute.call (this, "cy", y);
};

Circle.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Circle.prototype);
}

exports.Circle = Circle;