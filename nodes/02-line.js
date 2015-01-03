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
    var Line = require ("./svg/Line").Line;
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
              for (var i = 0; i < msg.nrSvg.coords.length-1; i++) {
                var line = new Line (msg.nrSvg.coords[i].x, msg.nrSvg.coords[i].y, 
                                     msg.nrSvg.coords[i+1].x, msg.nrSvg.coords[i+1].y,
                                     "stroke:rgb(255,0,0);stroke-width:3");
                elems[elems.length] = line;
              };
              msg.nrSvg = elems;
              node.send (msg);
          }
          else {
            var line = new Line (config.x1, config.y1, config.x2, config.y2, 
                                     "stroke:rgb(255,0,0);stroke-width:3", 
                                     config.zindex);
            msg.nrSvg = line;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("line", circleNode);
}
