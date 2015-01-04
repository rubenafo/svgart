/**
 * Copyright 2014 Ruben Afonso, ruben@figurebelow.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
  var Circle = require ("./svg/Circle").Circle;
  var Ellipse = require ("./svg/Ellipse").Ellipse;
  var Rect = require ("./svg/Rect").Rect;
  var Line = require ("./svg/Line").Line;
  var Text = require ("./svg/Text").Text;
  var Polygon = require ("./svg/Polygon").Polygon;

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
          shape = new Polygon (ctx.pos, ctx.pos, ctx.textString, ctx.func, ctx.zindex);
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