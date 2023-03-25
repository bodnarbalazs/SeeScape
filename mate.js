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

ctx.strokeStyle = '#adfc03';
ctx.lineWidth = 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x, y);
  ctx.stroke();

  x += DiffX;
  y += DiffY;

  if ((DiffX > 0 && x > endX) || (DiffX < 0 && x < endX) || (DiffY > 0 && y > endY) || (DiffY < 0 && y < endY)) {
    console.log("Vége öreg");
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

var animationId = requestAnimationFrame(animate);
