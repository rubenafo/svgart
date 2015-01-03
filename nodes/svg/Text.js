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

var SVGBase = require ("./SvgBase").SVGBase;

Text.type = "text";
Text.prototype = new SVGBase ();
Text.prototype.parent = SVGBase.prototype;

Text.prototype.constructor = Text;
function Text (x, y, text, style, zindex) {
  SVGBase.call (this, Text.type, zindex);
  this.setPos (x, y);
  this.setString (text);
  this.parent.setAttribute.call (this, "style", style);
};

Text.prototype.setString = function (text) {
  this.content.string = text;
};

Text.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "x", x); 
  this.parent.setAttribute.call (this, "y", y);
};

Text.prototype.toSVG = function () {
  return this.parent.toSVG.call (this, this.content.string);
};

Text.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Ellipse.prototype);
}

exports.Text = Text;