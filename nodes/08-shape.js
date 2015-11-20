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
  var ExecUtils = require ("./utils/NrSVGutils.js");

  function shapeNode (ctx) {

    RED.nodes.createNode(this, ctx);
    this.genContent = ctx.genContent;
    this.styleContent = ctx.styleContent;
    var node = this;
    this.on('input', function(msg)
    {
      var shape;
      switch (ctx.shapeType) {
        case Circle.type:
          shape = new Circle (0, 0, ctx.radio, ctx.func, ctx.zindex);
          break;
        case Ellipse.type:
          shape = new Ellipse (0, 0, ctx.rx, ctx.ry, ctx.func, ctx.zindex);
          break;
        case Rect.type:
          shape = new Rect (0, 0, ctx.elemwidth, ctx.elemheight, ctx.func, ctx.zindex);
          break;
        case Line.type:
          shape = new Line (0,0, 0, 0, ctx.func, ctx.zindex);
          break;
        case Text.type:
          shape = new Text (0, 0, ctx.textString, ctx.func, ctx.zindex);
          break;
        case Polygon.type:
          shape = new Polygon (ctx.textString, ctx.func, ctx.zindex);
          break;
        case Polyline.type:
          shape = new Polyline (ctx.textString, ctx.func, ctx.zindex);
          break;
      }
      var coords = [];
      if (this.genContent)
      {
        try
        {
          var results = ExecUtils.JsExecution (RED, console, Buffer, require, msg, this.genContent);
        }
        catch (err)
        {
          this.err(err);
        }
      }
      if (msg.nrSvg)
      {
        if (msg.nrSvg instanceof Array)
        {
          msg.nrSvg.push (shape);
        }
      }
      else
      {
        msg.nrSvg = [shape];
      }
      node.send (msg);
    });
    // on input ends
  };
  RED.nodes.registerType("shape", shapeNode);
}
