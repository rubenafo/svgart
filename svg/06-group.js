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
    var vm = require ("vm");
    var svg = require ("./svg.js");
    function GroupFunction (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var context = vm.createContext ();
        context.data = context.data || [];
        var elemsToGroup = config.elems;
        this.on('input', function(msg) {
          if (msg.nrSvg) {
            if (context.data.length < elemsToGroup) {
              node.send (null);
              context.data.push (msg.nrSvg);
            }
            if (context.data.length == elemsToGroup) { // waiting is over, send!
              var group = new svg.Group ();
              context.data.forEach (function (elem) {
                if (elem instanceof Array) {
                  group.addChild (elem.slice());
                }
                else
                  group.addChild (elem);
              });
              group.sortChildren ();
              msg.nrSvg = group;
              node.send(msg);
              context.data = [];
            }
          }
       });
    };
    RED.nodes.registerType("group", GroupFunction);
}