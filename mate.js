var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var startX = 1200;
var startY = 300;
var endX = 500;
var endY = 200;

var x = startX;
var y = startY;
var DiffX = Math.abs(endX - startX) / 100;
var DiffY = Math.abs(endY - startY) / 100;

if (startX > endX) {
  DiffX = -DiffX;
}
if (startY > endY) {
  DiffY = -DiffY;
}

ctx.strokeStyle = '#fffff';
ctx.lineWidth = 3;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x, y);
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'white';
  ctx.strokeStyle = 'white';
  ctx.stroke();

  x += DiffX;
  y += DiffY;

  if ((DiffX > 0 && x > endX) || (DiffX < 0 && x < endX) || (DiffY > 0 && y > endY) || (DiffY < 0 && y < endY)) {
    console.log("Vége öreg");
    cancelAnimationFrame(animationId);
    animateCircle();
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

function animateCircle() {
  var radius = 0;
  var maxRadius = 50;

  function drawCircle() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    ctx.beginPath();
    ctx.arc(endX, endY, radius, 0, 2 * Math.PI);
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'white';
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Update the radius
    radius += 1;

    // Stop the animation when the circle has reached maximum radius
    if (radius > maxRadius) {
      console.log("Circle animation finished");
      cancelAnimationFrame(circleAnimationId);
    } else {
      circleAnimationId = requestAnimationFrame(drawCircle);
    }
  }

  var circleAnimationId = requestAnimationFrame(drawCircle);
}

var animationId = requestAnimationFrame(animate);
