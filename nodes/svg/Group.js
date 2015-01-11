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

var SVGBase = require ("./SVGBase").SVGBase;

Group.type = "g";
Group.prototype = new SVGBase ();
Group.prototype.parent = SVGBase.prototype;

Group.prototype.constructor = Group;
function Group (zindex) {
  SVGBase.call (this, Group.type, zindex);
  this.content.children = [];
};

Group.prototype.setPos = function (x, y) {
  var translation = "translate("+ x +","+ y +")";
  this.parent.setAttribute.call (this, "transform", translation);
};

Group.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.children = new Array();
  this.content.children.forEach (function(item) {
    copy.content.children.push (item);
  });
  return copy;
}

Group.prototype.toSVG = function () {
  var svgString = new String ();
  this.content.children.forEach (function (item) {
    item = SVGadapter (item);
    svgString += item.toSVG();
  });
  return this.parent.toSVG.call (this, svgString);
};

Group.prototype.addChild = function (child) {
  if (child instanceof Array)
    this.content.children = this.content.children.concat (child.slice());
  else
    this.content.children.push (child);
};

Group.prototype.sortChildren = function () {
  if (this.content.children) {
    this.content.children.sort (OrderByZIndex);
  }
}

Group.prototype.getCenter = function () {
  // to be implemented
  console.log("Group::getCenter() not implemented");
}

Group.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Group.prototype);
}

exports.Group = Group;
