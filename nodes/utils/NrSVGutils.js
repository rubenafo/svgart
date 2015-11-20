/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

/*
 * Helper functions related to nodes and context handling
 */
var util = require("util");
var vm = require ("vm");

getDefaultSandbox = function (RED, console, Buffer, require, msg, func)
{
  var sandbox = {
    console:console,
    util:util,
    Buffer:Buffer,
    require:require,
    context: {
      global:RED.settings.functionGlobalContext || {}
    }
  };
  var functionText = "var results = null; results = (function(msg){"+ func + "\n})(msg);";
  var context = vm.createContext(sandbox);
  var script = vm.createScript(functionText);
  context.msg = msg;
  script.runInContext(context);
  return context.results;
}

exports.getDefaultSandbox = getDefaultSandbox;
