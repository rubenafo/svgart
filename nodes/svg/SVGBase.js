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

SVGBase.prototype.constructor = SVGBase;
function SVGBase (type, zindex) {
	this.content = {};
	this.content.properties = [];
  this.content.transform = new Array();
	
  this.content.type = type;
  this.content.zindex = zindex || 0;
};

SVGBase.prototype.setAttribute = function (key, value) {
  var lowerStr = key.toLowerCase();
  if (this.content.properties.indexOf(lowerStr) == -1)
  {
    this.content.properties.push (lowerStr);
  }
  this.content[lowerStr] = value;
};

SVGBase.prototype.getZindex = function () {
  return this.content["zindex"] || 0;
};

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

SVGBase.prototype.getType = function () {
  return this.content.type;
};

SVGBase.prototype.getZIndex = function () {
  return this.content.zindex;
};

SVGBase.prototype.applyTransform = function (transf) {
  if (transf.rotate) {
    this.addRotate (transf.rotate.deg,0,0);
  }
  if (transf.translate) {
    this.addTranslate (transf.translate.x, transf.translate.y);
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

SVGBase.prototype.getTransformString = function () {
  var resString = "";
  for (var i = 0; i < this.content.transform.length; i++) {
    var item = this.content.transform[i];
    if (i > 0) 
      resString += " ";
    switch (item.op) {
      case "translate": case "scale":
        resString += item.op + "(" + item.x+ "," + item.y + ")";
        break;
      case "rotate": 
        resString += item.op + "(" + item.degrees + "," + item.x + "," + item.y + ")";
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

SVGBase.prototype.addTranslate = function (x, y) {
  this.content.transform.push ({op:"translate", 'x':x, 'y':y});
}

SVGBase.prototype.addScale = function (x, y) {
  this.content.transform.push ({op:"scale", 'x':x, 'y':y});
}

SVGBase.prototype.addRotate = function (degrees, x, y) {
  this.content.transform.push ({op:"rotate", 'degrees': degrees, 'x':x, 'y':y});
}

SVGBase.prototype.addSkewX = function (x) {
  this.content.transform.push ({op:"skewX", 'val':x});
}

SVGBase.prototype.addSkewY = function (y) {
  this.content.transform.push ({op:"skewY", 'val':y});
}

SVGBase.prototype.adapt = function (prototype) {
  this.__proto__ = prototype;
  return this;
}

exports.SVGBase = SVGBase;