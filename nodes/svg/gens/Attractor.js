/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

// http://struct.cc/blog/2011/08/15/strange-attractors/

var Functions = require ("../Utils.js");

Attractor.type = "SimpleAttractor";
Attractor.prototype.constructor = Attractor;
function Attractor (numPoints, entryString, width, height)
{

  // Fractal pattern and coefficients.
  var a = [];
  var res = [];

  // Parameters.
  var x = 0.1, y = 0.1;
  var r = 360 % entryString.length;

  // Initialize coefficients.
  for (i = 0; i < entryString.length; i++)
  {
    a[i] = (entryString.charCodeAt(i) - 65 - 12) / 10;
  }
  res.push ({x:(width/2) + 50 * Math.cos(r),y:(height/2) + 58 * Math.sin(r), r:0});
  for (i = 0; i < numPoints; i++)
  {
    var nx = a[0] + a[1]  * x + a[2]  * x * x
            + a[3] * x * y + a[4]  * y + a[5]  * y * y;
    var ny = a[6] + a[7]  * x + a[8]  * x * x
            + a[9] * x * y + a[10] * y + a[11] * y * y;
    x = nx; y = ny;
    var xvalue = (width/2)*x;
    xvalue += width/2;
    var yvalue = (height/2)*y;
    yvalue += height/2;
    var previousPoint = res[res.length-1];
    res.push ({x:xvalue, y:yvalue,
               r: Functions.calculateAngle (previousPoint, {x:xvalue, y:yvalue})});
  }
  return res;
}

Attractor.getSample = function ()
{
    return "var Gens = require (\"./svg/gens/attractor.js\");" +
           "var coords = new Gens.Attractor (120, \"QGGVSLMHHGCR\", 800, 600);" +
           "return coords;";
}

/**
  Rossler Attractor code.
  http://paulbourke.net/fractals/rossler/
*/
function Rossler (numPoints, x0, y0, width, height)
{
  function rosslerPoint (x, y, z, a, b, c) {
    var dx = -(y + z);
    var dy = x + a * y;
    var dz = b + z * (x - c);
    return {x:dx, y:dy, z:dz};
  };

  var center = {x: width/2, y:height/2};   // center in the screen
  var a = 0.2, b = 0.2, c = 8, h = 0.05;
  var x = x0 || 0.1;
  var y = y0 || 0.1;
  var z = 0.1;
  var tmpx = 0, tmpy = 0, tmpz =0;
  var res = [];
  res.push ({x:x, y:y, z:z});
  for (var i = 0; i < numPoints; i++)
  {
    var dt = rosslerPoint (x, y, z, a, b, c);
    tmpx = x + h * dt.x;
    tmpy = y + h * dt.y;
    tmpz = z + h * dt.z;
    if (Math.abs(tmpx*1000 - x*1000) > 5 || Math.abs(tmpy*1000 - y*1000) > 5)
      res.push ({x: tmpx*500 + center.x, y: tmpy*500 + center.y, z:tmpz});
    x = tmpx;
    y = tmpy;
    z = tmpz;
  }
  return res;
}

exports.Attractor = Attractor;
exports.Rossler = Rossler;
