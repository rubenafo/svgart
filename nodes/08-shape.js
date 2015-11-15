/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

module.exports = function(RED) {
  var Circle = require ("./svg/Circle").Circle;
  var Ellipse = require ("./svg/Ellipse").Ellipse;
  var Rect = require ("./svg/Rect").Rect;
  var Line = require ("./svg/Line").Line;
  var Text = require ("./svg/Text").Text;
  var Polygon = require ("./svg/Polygon").Polygon;
  var Polyline = require ("./svg/Polyline").Polyline;
  var Utils = require ("./svg/Utils");

  function shapeNode (ctx) {

    RED.nodes.createNode(this, ctx);
    var node = this;
    this.on('input', function(msg) {
      var shape;
      switch (ctx.shapeType) {
        case Circle.type:
          shape = new Circle (ctx.xpos, ctx.ypos, ctx.radio, ctx.func, ctx.zindex);
          break;
        case Ellipse.type:
          shape = new Ellipse (ctx.xpos, ctx.ypos, ctx.rx, ctx.ry, ctx.func, ctx.zindex);
          break;
        case Rect.type:
          shape = new Rect (ctx.xpos, ctx.ypos, ctx.elemwidth, ctx.elemheight, ctx.func, ctx.zindex);
          break;
        case Line.type:
          shape = new Line (ctx.x1pos, ctx.y1pos, ctx.x2pos, ctx.y2pos, ctx.func, ctx.zindex);
          break;
        case Text.type:
          shape = new Text (ctx.xpos, ctx.ypos, ctx.textString, ctx.func, ctx.zindex);
          break;
        case Polygon.type:
          shape = new Polygon (ctx.textString, ctx.func, ctx.zindex);
          break;
        case Polyline.type:
          shape = new Polyline (ctx.textString, ctx.func, ctx.zindex);
          break;
      }
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
  RED.nodes.registerType("shape", shapeNode);
}
