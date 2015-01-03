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

function SVGBase (type, zindex) {
	this.content = {};
	this.content.properties = [];
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
  var baseData = this.content;
  this.content.properties.forEach (function (elem) {
    res.content.properties.push (elem);
    res.content [elem] = baseData[elem];
  });
  return res;
}

SVGBase.prototype.getType = function () {
  return this.content.type;
};

SVGBase.prototype.getZIndex = function () {
  return this.content.zindex;
};

SVGBase.prototype.adapt = function (prototype) {
  this.__proto__ = prototype;
  return this;
}

// end SVGBase definition

// SVG element /////////////////////////

SVG.type = "svg";
SVG.prototype = new SVGBase;
SVG.prototype.parent = SVGBase.prototype;

SVG.prototype.constructor = SVG;
function SVG (width, height, style) {
	SVGBase.call (this, "svg");
  this.parent.setAttribute.call (this, "width", width);
  this.parent.setAttribute.call (this, "height", height);
  this.parent.setAttribute.call (this, "version", "1.1");
  this.parent.setAttribute.call (this, "encoding", "UTF-8");
  this.parent.setAttribute.call (this, "standalone", "no");
  this.parent.setAttribute.call (this, "xmlns:cc", "http://creativecommons.org/ns#");
  this.parent.setAttribute.call (this, "xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  this.parent.setAttribute.call (this, "xmlns:svg", "http://www.w3.org/2000/svg");
  this.parent.setAttribute.call (this, "xmlns", "http://www.w3.org/2000/svg");
  this.parent.setAttribute.call (this, "xmlns:xlink", "http://www.w3.org/1999/xlink");
  
  // It takes the style to create a rectangle and use it as a background
  this.backgroundStyle = style;
};

SVG.prototype.toSVG = function (content) {
	if (this.backgroundStyle && this.backgroundStyle.trim()) {
    var backgroundRect = "<rect x=\"0\" y=\"0\" width=\"" + this.content.width +
                           "\" height=\"" + this.content.height + "\" " +
                           "style=\"" + this.backgroundStyle + "\"></rect>";
    content += backgroundRect;
  };
  return this.parent.toSVG.call (this, content);
};

SVG.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, SVG.prototype);
}

// Circle element //////////////////////

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

// Ellipse element /////////////////////

Ellipse.type = "ellipse";
Ellipse.prototype = new SVGBase ();
Ellipse.prototype.parent = SVGBase.prototype;

Ellipse.prototype.constructor = Ellipse;
function Ellipse (cx, cy, rx, ry, style, zindex) {
  SVGBase.call (this, Ellipse.type, zindex);
  this.setPos (cx, cy);
  this.parent.setAttribute.call (this, "rx", rx);
  this.parent.setAttribute.call (this, "ry", ry);
  this.parent.setAttribute.call (this, "style", style);
};

Ellipse.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "cx", x); 
  this.parent.setAttribute.call (this, "cy", y);
};

Ellipse.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Ellipse.prototype);
}

// Group element ///////////////////////

Group.type = "g";
Group.prototype = new SVGBase ();
Group.prototype.parent = SVGBase.prototype;

Group.prototype.constructor = Group;
function Group (zindex) {
  SVGBase.call (this, Group.type, zindex);
  this.content.children = [];
};

Group.prototype.addChild = function (child) {
  if (child instanceof Array)
    this.content.children = this.content.children.concat (child.slice());
  else
    this.content.children.push (child);
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

Group.prototype.sortChildren = function () {
  if (this.content.children) {
    console.log(this.content.children);
    this.content.children.sort (OrderByZIndex);
  }
}

Group.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Group.prototype);
}

// Rect element ////////////////////////

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

Rect.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Rect.prototype);
}

// Line element ////////////////////////

Line.type = "line";
Line.prototype = new SVGBase ();
Line.prototype.parent = SVGBase.prototype;

Line.prototype.constructor = Line;
function Line (x1, y1, x2, y2, style, zindex) {
  SVGBase.call (this, Line.type, zindex);
  this.setCoords (x1, y1, x2, y2);
  this.parent.setAttribute.call (this, "style", style);
};

Line.prototype.setCoords = function (x1, y1, x2, y2) {
  this.parent.setAttribute.call (this, "x1", x1);
  this.parent.setAttribute.call (this, "y1", y1);
  this.parent.setAttribute.call (this, "x2", x2);
  this.parent.setAttribute.call (this, "y2", y2);
};

Line.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Line.prototype);
}

// SVG Adapter /////////////////////////

SVGadapter = function (elem) {
  if (elem.content && elem.content.type) {
    var type = elem.content.type;
    switch (type) {
      case SVG.type: return SVG.adapt (elem);
      case Circle.type: return Circle.adapt (elem);
      case Ellipse.type: return Ellipse.adapt (elem);
      case Group.type: return Group.adapt (elem);
      case Rect.type: return Rect.adapt (elem);
      case Line.type: return Line.adapt (elem);
    }
  }
  console.log ("Undefined type casting " + elem);
  return elem;
};

OrderByZIndex = function (a, b) {
  a = SVGadapter (a);
  b = SVGadapter (b);
  if (a.getZIndex() && b.getZIndex()) {
    return a.getZIndex() - b.getZIndex();
  }
  return 0; // unchanged
};

// Export statements to have this as a valid require () in NodeJS
//
exports.SVGBase = SVGBase;
exports.SVG = SVG;
exports.Circle = Circle;
exports.Ellipse = Ellipse;
exports.Group = Group;
exports.SVGadapter = SVGadapter;
exports.Rect = Rect;
exports.Line = Line;
exports.OrderByZIndex = OrderByZIndex;