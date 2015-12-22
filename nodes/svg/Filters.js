/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

/* SVG Filters */

DiffuseLightning = function (color, result, x, y, z, intensity)
{
  var filterString = "";
  filterString += "<filter id=" + Math.random() + ">";
  filterString += "<feDiffuseLighting in=\"SourceGraphic\" result=\"light\"
                  lighting-color=\"white\">";
  filterString += "<fePointLight y=\"10\" x=\"120\" z=\"20\"></fePointLight>";
  filterString += "</feDiffuseLighting>";
  filterString += "<feComposite in=\"SourceGraphic\" in2=\"light\"
      operator=\"arithmetic\" k1=\"1\" k2=\"0\" k3=\"0\" k4=\"0\"/></feComposite>";
  filterString += "</filter>";
  return filterString;
}
