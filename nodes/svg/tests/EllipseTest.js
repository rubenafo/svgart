var assert = require ("assert");
var should = require ("should");
var Ellipse = require ("../Ellipse.js").Ellipse;

describe ("Ellipse", function ()
{
  var ellipse;
  beforeEach(function() {
    ellipse = new Ellipse (5, 6, 7, 8, "fill:red", 3);
  });

  it ("should initialize smoothly", function ()
  {
    (function () {
      assert.equal (3, ellipse.getZIndex());
    }).should.not.throw();
  });

  it ("initializes with parameter", function ()
  {
    assert.equal (5, ellipse.getAttribute("cx"));
    assert.equal (6, ellipse.getAttribute("cy"));
    assert.equal (7, ellipse.getAttribute("rx"));
    assert.equal (8, ellipse.getAttribute("ry"));
    assert.equal ("fill:red", ellipse.getAttribute("style"));
    assert.equal (3, ellipse.getZIndex());
  });

  it ("gets its own center", function ()
  {
    assert.deepEqual ({x:5,y:6}, ellipse.getCenter());
  });

  it ("sets its position", function ()
  {
    ellipse.setPos(80, 90);
    assert.deepEqual ({x:80,y:90}, ellipse.getCenter());
  });

  it ("clones", function () {
    var newEllipse = ellipse.clone();
    assert.deepEqual (ellipse, newEllipse);
  });

  it ("clones to coords", function () {
    var coords = [{x:100, y:100}, {x:200, y:200}];
    var ellipses = ellipse.cloneToCoords(coords);
    assert.equal (ellipses.length, 2);
    ellipse.setPos (100, 100);
    assert.deepEqual (ellipses[0], ellipse);
    ellipse.setPos (200, 200);
    assert.deepEqual (ellipses[1], ellipse);
  });

});
