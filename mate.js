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
    //console.log("Vége öreg");
    animateCircle();
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

function animateCircle() {
  // Set the radius of the circle
  var radius = 50;

  // Set the duration of the animation
  var animationDuration = 50; // in milliseconds

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

 context.lineWidth = 10;
 context.strokeStyle = '#ad2323';
 context.shadowOffsetX = 0;
 context.shadowOffsetY = 0;
 context.shadowBlur = 10;
 context.shadowColor = '#656565';


  // Set the global alpha value back to 1
  ctx.globalAlpha = 1;

  // Draw the circle
  ctx.beginPath();
  ctx.arc(endX, endY, radius, Math.PI, 2 * Math.PI);
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'white';
  ctx.strokeStyle = 'white';
  ctx.stroke();

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'white';
  ctx.strokeStyle = 'white';
  ctx.stroke();

  // Wait for the animation duration to finish before stopping the animation
  setTimeout(function() {
    animationId = requestAnimationFrame(animate);
  }, animationDuration);
}

var animationId = requestAnimationFrame(animate);
