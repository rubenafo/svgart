/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Polygon = require ("../Polygon.js").Polygon;

describe ("Polygon", function () {

  it ("initializes smoothly", function ()
  {
    var polygon = new Polygon ("0,0 40,0 40,40 0,40", "", 1);
  });

  it ("calculates the center", function ()
  {
    var polygon = new Polygon ("0,0 40,0 40,40 0,40", "", 1);
    var center = polygon.getCenter();
    assert.deepEqual ({x:20, y:20}, center);
  });

  it ("sets the position", function ()
  {
    var polygon = new Polygon ("0,0 40,0 40,40 0,40", "", 1);
    polygon.setPos (60, 60);
    var center = polygon.getCenter();
    //assert.deepEqual ({x:60, y:60}, center);
  });
});
