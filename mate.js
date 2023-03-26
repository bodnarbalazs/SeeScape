(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

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
    animate();
  } else {
    animationId = requestAnimationFrame(animate);
  }
}
var radius = 75;
var endPercent = 45;
var curPerc = 0;
var counterClockwise = false;
var circ = Math.PI * 2;
var quart = Math.PI / 2;

context.lineWidth = 10;
context.strokeStyle = '#white';
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;
context.shadowBlur = 10;
context.shadowColor = '#white';

function animate(current) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(endX, endY, radius, -(quart), ((circ) * current) - quart, false);
  context.stroke();
  curPerc++;
  if (curPerc < endPercent) {
      requestAnimationFrame(function () {
          animate(curPerc / 100)
      });
  }
}

animate();

var animationId = requestAnimationFrame(animate);
