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
  function circleNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.on('input', function(msg) {
      var shapeType = config.shapeType;
      if (msg.nrSvg && msg.nrSvg.coords) {
        var elems = new Array();
        msg.nrSvg.coords.forEach (function (elem) {
          var ellipse = new Ellipse (elem.x, elem.y, config.rx, config.ry, 
                                     config.func, config.zindex);
          elems[elems.length] = ellipse;
        });
        msg.nrSvg = elems;
        node.send (msg);
      }
      else {
        switch (shapeType)
        {
          case "circle": 
            msg.nrSvg = new Circle (config.xpos, config.ypos, config.radio, config.func, config.zindex);
            break;
          case "ellipse":
            msg.nrSvg = new Ellipse (config.xpos, config.ypos, config.rx, config.ry, 
                                     config.func, config.zindex);
            break;
          case "rect":
            msg.nrSvg = new Rect (config.xpos, config.ypos, config.elemwidth, config.elemheight, 
                                     config.func, config.zindex);
            break;
          case "line":
            msg.nrSvg = new Line (config.x1pos, config.y1pos, config.x2pos, config.y2pos, 
                                     config.func, config.zindex);
          case "text":
            msg.nrSvg = new Text (config.xpos, config.ypos, config.textString, config.func, config.zindex);
        }
        node.send (msg);
      }
    });
  };
  RED.nodes.registerType("shape", circleNode);
}
