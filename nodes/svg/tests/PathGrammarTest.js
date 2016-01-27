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
    assert.deepEqual ([{type:'M', values:[{x:0, y:0}]}], PathGrammar.parse("M0,0"));
  });

  it ("parses a list of points", function () {
    var points = PathGrammar.parse("M0,0 5,10 20,20Z");
    assert.equal (3, points[0].values.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[0].values[1]);
    assert.deepEqual ({x:20, y:20}, points[0].values[2]);
    assert.equal ("Z", points[1].type);
  });

  it ("parses a list of line points", function () {
    var points = PathGrammar.parse("M0,0 L5,10 L20,20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.deepEqual ({x:5, y:10}, points[1].values[0]);
    assert.deepEqual ({x:20, y:20}, points[2].values[0]);
    assert.equal ("M", points[0].type);
    assert.equal ("L", points[1].type);
    assert.equal ("L", points[2].type);
    assert.equal ("Z", points[3].type);
  });

  it ("parses a list of horizontal points", function () {
    var points = PathGrammar.parse("M0,0 H10 H20Z");
    assert.equal (4, points.length);
    assert.deepEqual ({x:0, y:0}, points[0].values[0]);
    assert.equal (10, points[1].values);
    assert.equal (20, points[2].values);
    assert.equal ("M", points[0].type);
    assert.equal ("H", points[1].type);
    assert.equal ("H", points[2].type);
    assert.equal ("Z", points[3].type);
  });

});
