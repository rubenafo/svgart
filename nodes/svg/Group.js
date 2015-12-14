/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SVGBase = require ("./SVGBase").SVGBase;
var Utils = require ("./Utils");

Group.type = "g";
Group.prototype = new SVGBase ();
Group.prototype.parent = SVGBase.prototype;

Group.prototype.constructor = Group;
function Group (zindex) {
  SVGBase.call (this, Group.type, zindex);
  this.content.children = [];
};

Group.prototype.setPos = function (x, y) {
  var center = this.getCenter();
  this.parent.addTranslate.call (this, x - center.x, y - center.y);
};

Group.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  copy.content.children = [];
  this.content.children.forEach (function(item) {
    copy.content.children.push (item);
  });
  return Group.adapt (copy);
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
  var childrenCenter = [];
  for (var i = 0; i < this.content.children.length; i++)
  {
    var child = this.content.children[i];
    child = SVGadapter (child);
    childrenCenter.push (child.getCenter());
  }
  return Utils.NonIntersecPolCenter (childrenCenter);
}

/**
* Clones the Group to the given coords array
* @param {object} coords - array of coords ({x:val,y:val})
*/
Group.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var newGroup = this.clone();
    newGroup.setPos (coords[i].x, coords[i].y);
    //if (coords[i].r)
      // TODO rotate
    results.push (newGroup);
  }
  return results;
}

Group.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Group.prototype);
}

exports.Group = Group;
