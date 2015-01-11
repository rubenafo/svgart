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

 // Rect element ////////////////////////

var SVGBase = require ("./SVGBase.js").SVGBase;

Rect.type = "rect";
Rect.prototype = new SVGBase ();
Rect.prototype.parent = SVGBase.prototype;

Rect.prototype.constructor = Rect;
function Rect (x, y, width, height, style, zindex) {
  SVGBase.call (this, Rect.type, zindex);
  this.setPos (x, y);
  this.parent.setAttribute.call (this, "width", width);
  this.parent.setAttribute.call (this, "height", height);
  this.parent.setAttribute.call (this, "style", style);
};

Rect.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "x", x); 
  this.parent.setAttribute.call (this, "y", y);
};

Rect.prototype.getCenter = function () {
  var width = this.parent.getAttribute.call (this, "width");
  var height= this.parent.getAttribute.call (this, "height");
  return ({x:width/2, y:height/2});
}

Rect.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Rect.prototype);
}

exports.Rect = Rect;