/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var SimpleAttractor = require ("./Attractor.js").Attractor;

GenAdapter = function (elem) {
  if (elem.content && elem.content.type) {
    var type = elem.content.type;
    switch (type) {
      case SimpleAttractor.type: return Attractor;
    }
  }
  console.log ("Undefined generator type casting " + elem);
  return elem;
};

exports.GenAdapter = GenAdapter;
