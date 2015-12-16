var assert = require ("assert");
var should = require ("should");
var Circle = require ("../Circle.js").Circle;

describe ("Circle", function ()
{
  it ("should initialize smoothly", function ()
  {
    (function () {
      var circle = new Circle();
      assert.equal (0, circle.getZIndex());
    }).should.not.throw();
  })

  it ("initializes with parameter", function ()
  {
    var circle = new Circle (5, 6, 10, "fill:red", 3);
    assert.equal (10, circle.getAttribute("r"));
    assert.equal (5, circle.getAttribute("cx"));
    assert.equal (6, circle.getAttribute("cy"));
    assert.equal ("fill:red", circle.getAttribute("style"));
    assert.equal (3, circle.getZIndex());
  });

  it ("gets its own center", function ()
  {
    var circle = new Circle (30, 40, 10);
    assert.deepEqual ({x:30,y:40}, circle.getCenter());
  });

})
