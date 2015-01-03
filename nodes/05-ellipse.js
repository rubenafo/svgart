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
  var Ellipse = require ("./svg/Ellipse").Ellipse;
  function circleNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {
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
        var ellipse = new Ellipse (config.xpos, config.ypos, config.rx, config.ry, 
                                       config.func, config.zindex);
        msg.nrSvg = ellipse;
        node.send (msg);
      }
    });
  };
  RED.nodes.registerType("ellipse", circleNode);
}
