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
  var Path = require ("./svg/Path").Path;
  var ExecUtils = require ("./utils/NrSVGutils.js");

  var PathGrammar = require ("./svg/grammars/PathGrammar");

  function shapeNode (ctx) {

    RED.nodes.createNode(this, ctx);
    this.genContent = ctx.genContent;     // generator content
    this.styleContent = ctx.styleContent; // style content
    this.segmented = ctx.segmented;       // the path/line is segmented
    this.showGenContent = ctx.showGenContent;
    var node = this;
    this.on('input', function(msg)
    {
      var shape;
      switch (ctx.shapeType) {
        case Circle.type:
          shape = new Circle (0, 0, ctx.radio, node.styleContent, ctx.zindex);
          break;
        case Ellipse.type:
          shape = new Ellipse (0, 0, ctx.rx, ctx.ry, node.styleContent, ctx.zindex);
          break;
        case Rect.type:
          shape = new Rect (0, 0, ctx.elemwidth, ctx.elemheight, node.styleContent, ctx.zindex);
          break;
        case Line.type:
          shape = new Line (0,0, 0, 0, node.styleContent, ctx.zindex);
          break;
        case Text.type:
          shape = new Text (0, 0, ctx.textString, node.styleContent, ctx.zindex);
          break;
        case Polygon.type:
          shape = new Polygon (ctx.textString, node.styleContent, ctx.zindex);
          break;
        case Polyline.type:
          shape = new Polyline (ctx.textString, node.styleContent, ctx.zindex);
          break;
        case Path.type:
          if (ctx.textString.length)
          {
            var d = PathGrammar.parse(ctx.textString);
          }
          shape = new Path (ctx.textString, ctx.styleContent, ctx.zindex);
          break;
      }
      var coords = [];
      var shapeList = [];
      if (this.genContent)
      {
        if (shape.type == Path.type && ctx.textString.length) // we use the textString as generator
        {
          shapeList = shape;
        }
        else
          try
          {
            var coords = ExecUtils.JsExecution (RED, console, Buffer, require, msg, this.genContent);
            shapeList = shape.applyPoints (coords, this.segmented);
          }
          catch (err)
          {
            this.err(err);
          }
      }
      else
      {
        shapeList.push (shape);
      }

      // Prepare the node output
      if (!msg.nrSvg || !msg.nrSvg instanceof Array)
      {
        msg.nrSvg = [];
      }
      msg.nrSvg = msg.nrSvg.concat (shapeList);
      
      // Send the output, only msg.nrSvg field is modified
      node.send (msg);
    });
    // on input ends
  };
  RED.nodes.registerType("shape", shapeNode);
}
