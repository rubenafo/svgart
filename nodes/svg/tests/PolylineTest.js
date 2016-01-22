/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Polyline = require ("../Polyline.js").Polyline;

describe ("Polyline", function () {

  it ("initializes correctly", function () {
    var polyline = new Polyline ("0,0 10,10 20,40", "stroke: red", 1);
    assert.equal (1, polyline.getZIndex());
    assert.equal ("stroke: red", polyline.getAttribute("style"));
    assert.equal ("0,0 10,10 20,40", polyline.getAttribute ("points"));
  });

  it ("stores the points correctly", function () {
    var polyline = new Polyline ("0,0 10,10 20,40", "stroke: red", 1);
    assert.equal (3, polyline.content.polyPoints[0].length);
  });

  it ("gets the center correctly", function () {
    var polyline = new Polyline ("0,0 10,0 10,10 0,10", "stroke: red", 1);
    var center = polyline.getCenter();
    assert.deepEqual ({x:5, y: 5}, center);
  });

  it ("clones itself", function () {
    var polyline = new Polyline ("0,0 10,0 10,10 0,10", "stroke: red", 1);
    var poly2 = polyline.clone();
    assert.deepEqual (poly2, polyline);
  });
});
