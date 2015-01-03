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
    var Circle = require ("./svg/Circle.js").Circle;
    function circleNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
            msg.nrSvg.coords.forEach (function (elem) {
              var circle = new Circle (elem.x, elem.y, 40, config.func, config.zindex);
              elems[elems.length] = circle;
            });
            msg.nrSvg = elems;
            node.send (msg);
          }
          else {
	          var circle = new Circle (config.xpos, config.ypos, config.radio, 
                                         config.func, config.zindex);
            msg.nrSvg = circle;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("circle", circleNode);
}