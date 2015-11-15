/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

module.exports = function(RED) {
  var Path = require ("./svg/Path").Path;
  var Utils = require ("./svg/Utils");

  function shapeNode (ctx) {

    RED.nodes.createNode(this, ctx);
    var node = this;
    this.on('input', function(msg) {
      var shape = new Path (ctx.textString, ctx.func, ctx.zindex);
      if (msg.nrSvg) {
        if (msg.nrSvg instanceof Array) {
          msg.nrSvg.push (shape);
        }
      }
      else {
        msg.nrSvg = [shape];
      }
      node.send (msg);
    });
  };
  RED.nodes.registerType("path", shapeNode);
}
