
function SVGBase (t) {
	this.data = {};
	this.data.properties = [];
	this.data.type = t;
};

SVGBase.prototype.setAttribute = function (key, value) {
  var lowerStr = key.toLowerCase();
  if (this.data.properties.indexOf(lowerStr) == -1)
  {
    this.data.properties.push (lowerStr);
  }
  this.data[lowerStr] = value;
};

SVGBase.prototype.toString = function (content) {
	var retValue = "<" + this.data.type;
  var data = this.data;
  this.data.properties.forEach (function (elem) {
		retValue += " " + elem + "=\"" + data[elem] + "\" ";
  });
  retValue += ">";
  if (content) {
		retValue += content;
  }
	retValue += "</" + this.data.type + ">";
  return retValue;
};

SVGBase.prototype.serialize = function () {
    return JSON.stringify (this.data);
};

SVGBase.prototype.unserialize = function (rawContent) {
  this.data = JSON.parse (rawContent);
 };

SVGBase.prototype.clone = function () {
  var res = new SVGBase ();
  res.data = {};
  res.data.properties = [];
  res.data.type = this.data.type;
  var baseData = this.data;
  this.data.properties.forEach (function (elem) {
    res.data.properties.push (elem);
    res.data [elem] = baseData[elem];
  });
  return res;
}

// end SVGBase definition

// SVG element /////////////////////////

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

SVG.prototype.toString = function (content) {
	if (this.backgroundStyle && this.backgroundStyle.trim()) {
    var backgroundRect = "<rect x=\"0\" y=\"0\" width=\"" + this.data.width +
                           "\" height=\"" + this.data.height + "\" " +
                           "style=\"" + this.backgroundStyle + "\"></rect>";
    content += backgroundRect;
  };
  return this.parent.toString.call (this, content);
};

// Circle element //////////////////////

Circle.prototype = new SVGBase;
Circle.prototype.parent = SVGBase.prototype;

Circle.prototype.constructor = Circle;
function Circle (x, y, rd, style) {
	SVGBase.call (this, "circle");
  this.parent.setAttribute.call (this, "cx", x); 
  this.parent.setAttribute.call (this, "cy", y);
  this.parent.setAttribute.call (this, "r", rd);
  this.parent.setAttribute.call (this, "style", style);
};

// Ellipse element /////////////////////

Ellipse.prototype = new SVGBase ();
Ellipse.prototype.parent = SVGBase.prototype;

Ellipse.prototype.constructor = Ellipse;
function Ellipse (cx, cy, rx, ry, style) {
  SVGBase.call (this, "ellipse");
  this.parent.setAttribute.call (this, "cx", cx);
  this.parent.setAttribute.call (this, "cy", cy);
  this.parent.setAttribute.call (this, "rx", rx);
  this.parent.setAttribute.call (this, "ry", ry);
  this.parent.setAttribute.call (this, "style", style);
};

// Rect element ////////////////////////

// Line element ////////////////////////

exports.SVGBase = SVGBase;
exports.SVG = SVG;
exports.Circle = Circle;
exports.Ellipse = Ellipse;
