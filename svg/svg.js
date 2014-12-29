
function SVGBase (t) {
	this.data = {};
	this.data.properties = [];
	this.data.type = t;
};

SVGBase.prototype.addProperty = function (key, value) {
	this.data.properties.push (key);
  this.data[key] = value;
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

// end SVGBase definition

// SVG element /////////////////////////

SVG.prototype = new SVGBase;
SVG.prototype.parent = SVGBase.prototype;

SVG.prototype.constructor = SVG;
function SVG (width, height, style) {
	SVGBase.call (this, "svg");
  this.parent.addProperty.call (this, "width", width);
  this.parent.addProperty.call (this, "height", height);
  this.parent.addProperty.call (this, "version", "1.1");
  this.parent.addProperty.call (this, "encoding", "UTF-8");
  this.parent.addProperty.call (this, "standalone", "no");
  this.parent.addProperty.call (this, "xmlns:cc", "http://creativecommons.org/ns#");
  this.parent.addProperty.call (this, "xmlns:rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  this.parent.addProperty.call (this, "xmlns:svg", "http://www.w3.org/2000/svg");
  this.parent.addProperty.call (this, "xmlns", "http://www.w3.org/2000/svg");
  this.parent.addProperty.call (this, "xmlns:xlink", "http://www.w3.org/1999/xlink");
  
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

Circle.prototype = new SVGBase ();
Circle.prototype.parent = SVGBase.prototype;

Circle.prototype.constructor = Circle;
function Circle (cx, cy, rd) {
	SVGBase.call ("circle");
  this.parent.addProperty (this, "cx", x); 
  this.parent.addProperty (this, "cy", y);
  this.parent.addProperty (this, "r", rd);
};

// Ellipse element /////////////////////

// Rect element ////////////////////////

// Line element ////////////////////////

exports.SVGBase = SVGBase;
exports.SVG = SVG;
