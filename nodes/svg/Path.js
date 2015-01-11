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

// Path element

 var SVGBase = require ("./SVGBase").SVGBase;

Path.type = "path";
Path.prototype = new SVGBase ();
Path.prototype.parent = SVGBase.prototype;

Path.prototype.constructor = Path;
function Path (d, style, zindex) {
  SVGBase.call (this, Path.type, zindex);
  this.parent.setAttribute.call (this, "d", d);
  this.parent.setAttribute.call (this, "style", style);
};

/* 
 * Paths don't accept x,y so we use the transform attribute
 */
Path.prototype.setPos = function (x,y) {
  this.parent.addTranslate.call (this, x, y);
};

Path.prototype.getCenter = function () {
  // to be implemented
  console.log("Path::getCenter() not implemented");
}

Path.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Path.prototype);
}

exports.Path = Path;