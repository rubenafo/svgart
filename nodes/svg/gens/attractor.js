
// http://struct.cc/blog/2011/08/15/strange-attractors/

attractor = function (numPoints, entryString)
{

  // Fractal pattern and coefficients.
  var a = [];
  var res = [];

  // Parameters.
  var x = 0.1, y = 0.1;
  var r = Math.random(360);

  // Initialize coefficients.
  for (i = 0; i < entryString.length; i++)
  {
    a[i] = (entryString.charCodeAt(i) - 65 - 12) / 10;
  }

  // Make 25 iterations each drawing cycle.
  for (i = 0; i < numPoints; i++)
  {
    //p.point(x * 200, y * 200);
    //p.rotate(r);
    var nx = a[0] + a[1]  * x + a[2]  * x * x
            + a[3] * x * y + a[4]  * y + a[5]  * y * y;
    var ny = a[6] + a[7]  * x + a[8]  * x * x
            + a[9] * x * y + a[10] * y + a[11] * y * y;
    x = nx; y = ny;
    // (x*200,y*200);
    res.push ({x:x*200, y:y*200});
  }
  return res;
}

console.log(attractor(10, "QGGVSLMHHGCR"));
