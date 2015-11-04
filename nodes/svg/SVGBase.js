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

/**
 * @class Represents the base SVG element.
 * @constructor SVGBase
 * @param {string} type
 * @param {number} zindex
 */
SVGBase.prototype.constructor = SVGBase;
function SVGBase (type, zindex) {
	this.content = {};
	this.content.properties = [];
  this.content.transform = new Array();
  this.content.type = type;
  this.content.zindex = zindex || 0;
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
 * Returns an attribute by its key (case insenstive)
 * @param {string} key
 */
SVGBase.prototype.getAttribute = function (key) {
  var lowerStr = key.toLowerCase();
  return this.content[lowerStr];
}

/**
 * Returns the z-index of the element.
 * The default value is zero.
 */
SVGBase.prototype.getZindex = function () {
  return this.content["zindex"] || 0;
};

/**
 * Returns the xml string containing all the properties,
 * ready to be inserted into a SVG element
 */
SVGBase.prototype.toSVG = function (content) {
	var retValue = "<" + this.content.type;
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
  res.content.type = this.content.type;
  res.content.zindex = this.content.zindex;
  var baseData = this.content;
  this.content.properties.forEach (function (elem) {
    res.content.properties.push (elem);
    res.content [elem] = baseData[elem];
  });
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
    this.setPos (0,0);
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

exports.SVGBase = SVGBase;
