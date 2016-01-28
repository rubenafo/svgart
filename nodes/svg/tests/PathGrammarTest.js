/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var PathGrammar = require ("../grammars/PathGrammar.js");

describe ("PathGrammar", function () {

  it ("parses a point", function () {
    assert.deepEqual ([{type:'m', values:[{x:0, y:0}]}], PathGrammar.parse("M0,0"));
  });

  it ("parses a list of points", function () {
    var points = PathGrammar.parse("M0,0 5,10 20,20Z");
    assert.equal (3, points[0].values.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[0].values[1]);
    assert.deepEqual ({x:20, y:20}, points[0].values[2]);
    assert.equal ("z", points[1].type);
  });

  it ("parses a list of line points", function () {
    var points = PathGrammar.parse("M0,0 L5,10 L20,20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[1].values[0]);
    assert.deepEqual ({x:20, y:20}, points[2].values[0]);
    assert.equal ("m", points[0].type);
    assert.equal ("l", points[1].type);
    assert.equal ("l", points[2].type);
    assert.equal ("z", points[3].type);
  });

  it ("parses a list of horizontal points", function () {
    var points = PathGrammar.parse("M0,0 H10 H20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.equal (10, points[1].values);
    assert.equal (20, points[2].values);
    assert.equal ("m", points[0].type);
    assert.equal ("h", points[1].type);
    assert.equal ("h", points[2].type);
    assert.equal ("z", points[3].type);
  });

  it ("parses a list of vertical points", function () {
    var points = PathGrammar.parse("M0,0 V10 V20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.equal (10, points[1].values);
    assert.equal (20, points[2].values);
    assert.equal ("m", points[0].type);
    assert.equal ("v", points[1].type);
    assert.equal ("v", points[2].type);
    assert.equal ("z", points[3].type);
  });

  it ("parses a list of smooth points", function () {
    var points = PathGrammar.parse("M0,0 S1,2,3,4  s5,6,7,8 L0,20Z");
    assert.equal (5, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x2:1,y2:2,x:3,y:4}, points[1].values[0]);
    assert.deepEqual ({x2:5,y2:6,x:7,y:8}, points[2].values[0]);
    assert.equal ("m", points[0].type);
    assert.equal ("s", points[1].type);
    assert.equal ("s", points[2].type);
    assert.equal ("l", points[3].type);
    assert.equal ("z", points[4].type);
  });

  it ("Upper and lower are valid point definitions", function () {
    assert.deepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("m0,0 v10 v20z"));
    assert.deepEqual (PathGrammar.parse("M0,0 L5,10 L20,20Z"), PathGrammar.parse("m0,0 l5,10 l20,20z"));
    assert.deepEqual (PathGrammar.parse("M0,0 H10 H20Z"), PathGrammar.parse("m0,0 h10 h20z"));
    assert.deepEqual (PathGrammar.parse("M0,0 V10 V20Z"), PathGrammar.parse("m0,0 v10 v20z"));
    assert.deepEqual (PathGrammar.parse("M0,0 S1,2,3,4 S5,6,7,8 L0,20Z"),
                      PathGrammar.parse("m0,0 s1,2,3,4 s5,6,7,8 l0,20z"));
  });

});
