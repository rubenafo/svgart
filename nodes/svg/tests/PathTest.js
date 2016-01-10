/**
* @license
* Copyright 2016 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var assert = require ("assert");
var should = require ("should");
var Path = require ("../Path.js").Path;

describe ("Path", function () {

  var path;
  beforeEach(function() {
    path = new Path ("", "fill:red", 3);
  });

  it ("should initialize smoothly", function ()
  {
    (function () {
      assert.equal (3, path.getZIndex());
    }).should.not.throw();
  })
});
