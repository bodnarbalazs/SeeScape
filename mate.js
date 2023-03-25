var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var startX = 100;
var startY = 300;
var endX = 700;
var endY = 500;

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

ctx.strokeStyle = '#adfc03';
ctx.lineWidth = 2;

function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Update the starting point of the line
  x += DiffX;
  y += DiffY;

  // Stop the animation when the line reaches the endpoint
  if ((DiffX > 0 && x > endX) || (DiffX < 0 && x < endX) || (DiffY > 0 && y > endY) || (DiffY < 0 && y < endY)) {
    console.log("Vége öreg");
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

var animationId = requestAnimationFrame(animate);
