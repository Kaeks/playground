function draw() {
    var canvas = document.getElementById("display");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        //draw stuff
        var pntA = {
          x: 100,
          y: 100
        }

        var pntB = {
          x: 150,
          y: 100
        }
        var pntC = calcEquTri(pntA, pntB, false);

        fillCircle(ctx, pntA.x, pntA.y, 50, "rgba(255,   0,   0, 0.5)");
        fillCircle(ctx, pntB.x, pntB.y, 50, "rgba(  0, 255,   0, 0.5)");
        fillCircle(ctx, pntC.x, pntC.y, 50, "rgba(  0,   0, 255, 0.5)");
        //end draw stuff
    } else {
        alert("Your browser does not support canvas elements");
    }
}

function fillCircle(ctx, x, y, rad, col) {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    ctx.fillStyle = col;
    ctx.fill();
}

function calcMid(pntA, pntB) {
  var ax = pntA.x;
  var ay = pntA.y;
  var bx = pntB.x;
  var by = pntB.y;

  var cx = (ax + bx) / 2;
  var cy = (ay + by) / 2;

  var pntC = {
    x: cx,
    y: cy
  }

  return pntC;
}

function calcLineAngle(pntA, pntB) {
  var ax = pntA.x;
  var ay = pntA.y;
  var bx = pntB.x;
  var by = pntB.y;

  var angleRad = Math.atan((by-ay)/(bx-ax));
  var angleDeg = angleRad * 180 / Math.PI;

  return angleDeg;
}

function calcDist(pntA, pntB) {
  var ax = pntA.x;
  var ay = pntA.y;
  var bx = pntB.x;
  var by = pntB.y;

  var dist = Math.sqrt(Math.pow(bx-ax, 2) + Math.pow(by-ay, 2));

  return dist;
}

/**
 * Calculates third point in equilateral triangle using two points.
 *
 * @param {array} pntA Array consisting of x and y coordinate of point A
 * @param {array} pntB Array consisting of x and y coordinate of point B
 * @param {bool} flip
 *
 * @return {array} Array consisting of x and y coordinate of calculated point C
 */
function calcEquTri(pntA, pntB, flip) {
  var mid = calcMid(pntA, pntB);
  var mx = mid.x;
  var my = mid.y;

  if (flip == null) {
    flip = false;
  }

  var lineAngleDeg = calcLineAngle(pntA, pntB);
  if (flip) {
    var newAngleDeg = lineAngleDeg - 90;
  } else {
    var newAngleDeg = lineAngleDeg + 90;
  }
  var newAngleRad = newAngleDeg * Math.PI / 180;

  var dist = calcDist(pntA, pntB);
  var height = Math.sqrt(Math.pow(dist, 2) - Math.pow(dist/2, 2));
  var dx = height * Math.cos(newAngleRad);
  var dy = height * Math.sin(newAngleRad);

  var cx = mx + dx;
  var cy = my + dy;

  var pntC = {
    x: cx,
    y: cy
  }

  return pntC;
}
