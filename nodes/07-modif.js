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
  var Group = require ("./svg/Group").Group;
  var ExecUtils = require ("./utils/NrSVGutils.js");
  var vm = require ("vm");

  var PathGrammar = require ("./svg/grammars/PathGrammar");

  function modifNode (ctx) {

    RED.nodes.createNode(this, ctx);
    this.genContent = ctx.genContent;     // generator content
    this.styleContent = ctx.styleContent; // style content
    this.segmented = ctx.segmented;       // the path/line is segmented
    this.showGenContent = ctx.showGenContent;
    this.groupLength = ctx.groupLength;
    var context = vm.createContext ();
    context.data = context.data || [];
    var node = this;
    this.on('input', function(msg)
    {
      node.send (msg);
    }); // this.on(input)
  };
  RED.nodes.registerType("modif", modifNode);
} // module.exports
