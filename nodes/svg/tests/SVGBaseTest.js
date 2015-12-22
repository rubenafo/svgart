var assert = require ("assert");
var should = require ("should");
var SVGBase = require ("../SVGBase.js").SVGBase;
var Circle = require ("../Circle.js").Circle;
var Rect = require ("../Rect.js").Rect;

describe ("SVG", function () {

  it ("initializes zindex", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    assert.equal (1, svg.getZIndex());
  });

  it ("initializes default definedByPoints", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    assert.equal (false, svg.isDefinedByPoints());
  });

  it ("initializes definedByPoints when defined", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1, true);
    assert.equal (true, svg.isDefinedByPoints());
  });

  it ("initializes default definedByPoints", function ()
  {
    var svg = new SVGBase (Circle.type);
    assert.equal (0, svg.getZIndex());
  });

  it ("sets attribute", function ()
  {
    var svg = new SVGBase (Circle.type, "", 1);
    var strings = ["height", "HEIGHT", "HeIGHT"];
    strings.forEach (function (attr) {
      svg.setAttribute (attr, 90);
      assert.equal (90, svg.getAttribute("height")); // always height
      assert.equal (90, svg.getAttribute(attr));
    });
  });

  it ("sets generator", function ()
  {
    var svg = new SVGBase (Rect.type, "", 1);
    svg.setAttribute ("width", 10);
    svg.setAttribute ("height", 20);
    svg.setGenerator ("width", "50+150");
    svg.setGenerator ("height", "Math.max(10, 20)");
    assert.deepEqual ([ "style","width", "height"], svg.content.properties)
    assert.deepEqual ({"width":"50+150", "height": "Math.max(10, 20)"},
                      svg.content.generators)
    assert.equal (200, svg.content["width"]); // attrs didn't change
    assert.equal (20, svg.content["height"]);
  });

  it ("clones", function ()
  {
    var svg = new SVGBase (Rect.type, "", 1);
    svg.setAttribute ("width", 50);
    svg.setAttribute ("height", 60);
    svg.setGenerator ("width", "50+150");
    svg.setGenerator ("height", "Math.max(10, 20)");
    var newSvg = svg.clone();
    assert.equal (200, newSvg.getAttribute ("width"));
    assert.equal (20, newSvg.getAttribute ("height"));
  });

  it ("clones and generates", function ()
  {
    var svg = new SVGBase (Rect.type, 1);
    svg.setAttribute ("width", 50);
    svg.setAttribute ("height", 60);
    svg.setGenerator ("width", "Math.random()");
    svg.setGenerator ("height", "Math.random()");
    var newSvg = svg.clone();
    assert.notEqual (svg.getAttribute("width"), newSvg.getAttribute ("width"));
    assert.notEqual (svg.getAttribute("height"), newSvg.getAttribute ("height"));
  });

  it ("returns the type", function ()
  {
    var svg = new SVGBase (Rect.type, 1);
    assert.equal (Rect.type, svg.getType());
  });

});
