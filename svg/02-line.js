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
    function circleNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
          if (msg.nrSvg && msg.nrSvg.coords) {
            var elems = new Array();
              for (var i = 0; i < msg.nrSvg.coords.length-1; i++) {
                var line = "<line x1=\"" + msg.nrSvg.coords[i].x + "\" y1=\"" + msg.nrSvg.coords[i].y +
                           "\" x2=\"" + msg.nrSvg.coords[i+1].x + "\" y2=\"" + msg.nrSvg.coords[i+1].y +
                           "\" " + "style=\"stroke:rgb(255,0,0);stroke-width:3\"></line>";
                elems[elems.length] = line;
              };
            msg.nrSvg = elems;
            node.send (msg);
          }
        });
    };
    RED.nodes.registerType("line", circleNode);
}
