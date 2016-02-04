/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var ExecUtils = require ("../utils/NrSVGutils.js");

/**
 * @class Represents the base SVG element.
 * @constructor SVGBase
 * @param {string} type
 * @param {number} zindex
 */
SVGBase.prototype.constructor = SVGBase;
function SVGBase (type, style, zindex, definedByPoints) {
	this.content = {};
	this.content.properties = [];
	this.content.generators = {};
  this.content.transform = new Array();
  this.content.type = type;
  this.content.zindex = zindex || 0;
	this.content.filterElem = "";
	this.content.filter = "";
	this.setStyle (style || "");
	this.content.definedByPoints = definedByPoints || false;
};

/**
 * Sets an attribute in the properties list
 * @param {string} key - the key to set
 * @param {string} value - the value to set
 */
SVGBase.prototype.setAttribute = function (key, value) {
  var lowerStr = key.toLowerCase();
  if (this.content.properties.indexOf(lowerStr) == -1)
  {
    this.content.properties.push (lowerStr);
  }
  this.content[lowerStr] = value;
};

/**
 * Sets a generator
 * @param {string} key - the key to set
 * @param {string} generator - generator string
 * @param {boolean} generate - if false, the attribute wont be generated
 */
SVGBase.prototype.setGenerator = function (key, generator) {
	var lowerStr = key.toLowerCase();
  this.content.generators[lowerStr] = generator;
	this.setAttribute (key, eval(generator));
};

/**
 * Returns an attribute by its key (case insenstive)
 * @param {string} key
 */
SVGBase.prototype.getAttribute = function (key) {
  var lowerStr = key.toLowerCase();
	if (this.content[lowerStr] == undefined)
	{
		throw ("Error: invalid attribute " + lowerStr + " in class " + this.content.type);
	}
  return this.content[lowerStr];
}

/**
 * Returns the xml string containing all the properties,
 * ready to be inserted into a SVG element
 */
SVGBase.prototype.toSVG = function (content) {
	var retValue = "<" + this.content.type + " ";
  var data = this.content;
  this.content.properties.forEach (function (elem) {
		retValue += " " + elem + "=\"" + data[elem] + "\" ";
  });
  retValue += this.getTransformString ();
  retValue += ">";
  if (content) {
		retValue += content;
  }
	retValue += "</" + this.content.type + ">";
	if (this.content.filter != "")
		retValue += this.content.filterElem;
  return retValue;
};

/**
 * Clones the object.
 * @return - a new SVGBase object
 */
SVGBase.prototype.clone = function () {
  var res = new SVGBase ();
  res.content = {};
  res.content.properties = [];
	res.content.generators = {};
  res.content.type = this.content.type;
  res.content.zindex = this.content.zindex;
	res.content.filter = this.content.filter;
	res.content.filterElem = this.content.filterElem;
	res.content.definedByPoints = this.content.definedByPoints;
  var baseData = this.content;
  this.content.properties.forEach (function (elem) {
    res.content.properties.push (elem);
    res.content[elem] = baseData[elem];
  });
	for (key in this.content.generators) {
		res.content.generators[key] = this.content.generators[key];
		res.content[key] = eval(res.content.generators[key]);
	};
  res.content.transform = new Array ();
  this.content.transform.forEach (function (elem) {
    res.content.transform.push (elem);
  });
  return res;
}

/** Returns the type of the object */
SVGBase.prototype.getType = function () {
  return this.content.type;
};

SVGBase.prototype.getZIndex = function () {
  return this.content.zindex;
};

/**
 * Applies a transformation operation
 * @param {object} trans - translate, rotate, scale, skewx, skewy
 */
SVGBase.prototype.applyTransform = function (transf) {
  if (transf.translate) {
    //this.setPos (0,0);
    this.addTranslate (transf.translate.x, transf.translate.y);
  }
  if (transf.rotate) {
    if (transf.rotate.x && transf.rotate.y) {
      this.addRotate (transf.rotate.deg, transf.rotate.x, transf.rotate.y);
    }
    else {
      var center = this.getCenter ();
      this.addRotate (transf.rotate.deg, center.x, center.y);
    }
  }
  if (transf.scale) {
    this.addScale (transf.scale.x, transf.scale.y);
  }
  if (transf.skewX) {
    this.addSkewX (transf.skewX.x);
  }
  if (transf.skewY) {
    this.addSkewY (transf.skewY.y);
  }
}

/**
 * Gets the list of transformations
 * @returns list of transformations (translates, rotates and skews)
 */
SVGBase.prototype.getTransforms = function ()
{
	return this.content.transform;
}

/**
 * Returns the transformation string of the transformation
 * operations stored in the transform list.
 */
SVGBase.prototype.getTransformString = function () {
  var resString = "";
  for (var i = 0; i < this.content.transform.length; i++) {
    var item = this.content.transform[i];
    if (i > 0)
      resString += " ";
    switch (item.op) {
      case "rotate":
        resString += item.op + "(" + item.degrees + "," + item.x + "," + item.y + ")";
        break;
      case "translate": case "scale":
        resString += item.op + "(" + item.x+ "," + item.y + ")";
        break;
      case "skewX": case "skewY":
        resString += item.op + "(" + item.val + ")";
        break;
    }
  };
  if (resString.length > 0) {
    resString = "transform=\"" + resString + "\"";
  }
  return resString;
}

/**
 * Adds a translate operation
 * @param {number} x - x offset
 * @param {number} y - y offset
 */
SVGBase.prototype.addTranslate = function (x, y) {
  this.content.transform.push ({op:"translate", 'x':x, 'y':y});
}

/**
 * Adds a scale operation
 * @param {number} x - x factor
 * @param {number} y - y factor
 */
SVGBase.prototype.addScale = function (x, y) {
  this.content.transform.push ({op:"scale", 'x':x, 'y':y});
}

/**
 * Adds a rotate operation
 * @param {number} degrees
 * @param {number} x - x position of the reference point
 * @param {number} y - y position of the reference point
 */
SVGBase.prototype.addRotate = function (degrees, x, y) {
  this.content.transform.push ({op:"rotate", 'degrees': degrees, 'x':x, 'y':y});
}

/**
 * Adds a skewx operation
 * @param {number} x - skew factor
 */
SVGBase.prototype.addSkewX = function (x) {
  this.content.transform.push ({op:"skewX", 'val':x});
}

/**
 * Adds a skewy operation
 * @param {number} y - skew factor
 */
SVGBase.prototype.addSkewY = function (y) {
  this.content.transform.push ({op:"skewY", 'val':y});
}

/**
 * Changes the base prototype of the object
 * @param {object} prototype - the prototype to change to
 */
SVGBase.prototype.adapt = function (prototype) {
  this.__proto__ = prototype;
  return this;
}

SVGBase.prototype.isDefinedByPoints = function ()
{
	return this.content.definedByPoints;
}

/**
 * Duplicates the object to the given coords array, each class should implement its own
 * @param {object} coords - array of coords ({x:val,y:val})
 * @returns {object} - an array objects
 */
SVGBase.prototype.cloneToCoords = function (coords)
{
	throw ("Missing cloneToCoords implementation for " + this.content.type + " class");
}

/**
 * Update the object to the coords array, each class should implement its own
 * @param {object} coords - array of coords ({x:val,y:val})
 * @returns {object} - an array objects
 */
SVGBase.prototype.updateCoords = function (coords)
{
	throw ("Missing updateCoords implementation for " + this.content.type + " class");
}

/**
* Sets the position of the object, each class should implement its own
* @param {number} x - x coord
* @param {number} y - y coord
*/
SVGBase.prototype.setPos = function (x, y)
{
	throw ("Missing setPos implementation for " + this.content.type + " class");
}

/**
 * Apply multiple points to an object.
 * If the object is defined by points (paths, poly's) then the object definition
 * is updated using the coords, otherwise it gets cloned and an array is returned.
 * @param {coords} - list of coords ({x:val, y:val})
 * @param {segmented} - whether the object should clone or segment along the coords
 * @return {Object} - an object or an array of them
 */
SVGBase.prototype.applyPoints = function (coords, segmented)
{
	if (this.isDefinedByPoints())
	{
		return segmented ? this.cloneToCoords (coords) : this.updateCoords (coords);
	}
	else
	{
		return this.cloneToCoords (coords);
	}
}

/**
 * Sets the filter element
 * @param{string} - SVG filter
 */
SVGBase.prototype.setFilter = function (filterStr)
{
	this.content.filterElem = filterStr;
}

/**
 * Gets the filter element
 * @return {string} - filter string
 */
SVGBase.prototype.getFilter = function (filterStr)
{
	return this.content.filterElem;
}

/**
 * Sets the element style attribute, extracting the filter if needed.
 * @param{string} - The style string content
 */
SVGBase.prototype.setStyle = function (styleStr)
{
	if (styleStr.length)
	{
		var matchFilter =   /.*light\s*:\s*(.*);/i;
		var filterFunction = styleStr.match (matchFilter);
		if (filterFunction != null)
		{
			var filter = filterFunction[1];
			var result = eval ("var Filter = require ('./Filters.js');" + filter);
			this.setFilter(result);
			styleStr = styleStr.replace (filter, "");
			styleStr = styleStr.replace("light:", "");
			styleStr = styleStr.replace(/\n/g, "");
			this.setAttribute ("filter", "url(#id33)");
		}
	}
	this.setAttribute ("style", styleStr);
}

exports.SVGBase = SVGBase;
