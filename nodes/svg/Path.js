/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/
// Path element

var SVGBase = require ("./SVGBase").SVGBase;
var PathGrammar = require ("./grammars/PathGrammar");
var Utils = require ("./Utils");

Path.type = "path";
Path.prototype = new SVGBase ();
Path.prototype.parent = SVGBase.prototype;

/**
* @class The SVG Path element
* @constructor Circle
* @param {number} pathString - Path's d attribute
* @param {string} style - CSS style string
* @param {number} zindex - zindex value
*/
Path.prototype.constructor = Path;
function Path (pathString, style, zindex) {
  SVGBase.call (this, Path.type, style, zindex, true);
  this.parent.setAttribute.call (this, "d", pathString);
  this.content.pathPoints = [];
  if (pathString.length)
  {
    this.content.pathPoints = PathGrammar.parse(pathString);
  }
};

/**
* Sets the position of the Path.
* @param {number} x - x coord
* @param {number} y - y coord
*/
Path.prototype.setPos = function (x,y) {
  // Paths don't have x,y so we use the transform
  if (this.content.transform.length)
  {
    var lastTransform = this.content.transform[this.content.transform.length-1];
    this.parent.addTranslate.call (this, lastTransform.x, lastTransform.y);
  }
  else
  {
    var center = this.getCenter();
    this.parent.addTranslate.call (this, x - center.x, y - center.y);
  }
};

/**
* Returns the coords of the center of the Path.
* The center is calculated by calculating the centroid of all
* the vertices.
* @returns - {x:value,y:value} containing the coords
*/
Path.prototype.getCenter = function () {
  var vertices = [];
  this.content.pathPoints.forEach (function (instruction) {
    if (instruction.values != undefined) {
         vertices = vertices.concat (instruction.values)
    }
  });
  var center = Utils.NonIntersecPolCenter (vertices);
  return center;
};

/**
 * Returns a noew instance of a Path
 * @returns a new Path.
 */
Path.prototype.clone = function () {
  var copy = this.parent.clone.call (this);
  if (this.content.pathPoints.length)
    copy.content.pathPoints = this.content.pathPoints.slice();
  else
    copy.content.pathPoints = [];
  return Path.adapt (copy);
}

/**
* Clones the Path to the given coords array, generating a path between
* each par of coords
* @param {object} coords - array of coords ({x:val,y:val})
* @return {object} - array of Path's
*/
Path.prototype.cloneToCoords = function (coords)
{
  if (!this.content.pathPoints.length)
  {
    var paths = [];
    for (var i = 1; i < coords.length; i++)
    {
      var path = this.clone();
      path.parent.setAttribute.call (path, "d", "M" + coords[i-1].x + "," + coords[i-1].y +
                                                " " + coords[i].x   + "," + coords[i].y);
      path.content.pathPoints.push ({type:"M", values:{x:coords[i-1].x, y:coords[i-1].y}});
      path.content.pathPoints.push ({type:"L", values:{x:coords[i].x, y:coords[i].y}});
      paths.push (path);
    }
    return paths;
  }
  else {
    var paths = [];
    for (var i = 0; i < coords.length; i++)
    {
      var path = this.clone();
      path.setPos (coords[i].x, coords[i].y);
      if (coords[i].r)
        path.applyTransform.call (path, {rotate:{deg:coords[i].r}} );
      paths.push (path);
    }
    return paths;
  }
}

/**
* Update the object coordinates
* @param {object} coords - array of coords ({x:val, y:val})
*/
Path.prototype.updateCoords = function (coords)
{
  this.content.pathPoints = new Array();
  var newString = "";
  newString += "M" + coords[0].x + "," + coords[0].y;
  //TODO for (var i = 1; i < coords.length/2; i++)
  //{
  //  this.content.pathPoints.push (coords[i]);
  //  newString += " S" + coords[i].x + " " + coords[i].y + " " + coords[i+1].x + " " + coords[i+1].y;
  //}
  for (var i = 1; i < coords.length; i++)
  {
    this.content.pathPoints.push (coords[i]);
    newString += " T" + Math.round(coords[i].x) + " " + Math.round(coords[i].y);
  }
  this.parent.setAttribute.call (this, "d", newString);
  return this;
}

/**
* Adapts an object to the Path class
*/
Path.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Path.prototype);
}

exports.Path = Path;
