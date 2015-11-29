/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

module.exports = function(RED) {
    var vm = require ("vm");
    var Group = require ("./svg/Group").Group;
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
              var group = new Group ();
              context.data.forEach (function (elem) {
                if (elem instanceof Array) {
                  elem.forEach (function (item) {
                    group.addChild (item);
                  });
                }
                else
                  group.addChild (elem);
              });
              group.sortChildren ();
              msg.nrSvg = [group];
              node.send(msg);
              context.data = [];
            }
          }
       });
    };
    RED.nodes.registerType("group", GroupFunction);
}
