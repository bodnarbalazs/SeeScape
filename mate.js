var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var startX = 100;
var startY = 300;
var x=100;
var y=100;

var DiffX = (startX-endX)/200;
var DiffY = (startY-endY)/200;

var endX = 700;
var endY = 500;

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
    if (x >= endX && y >= endY) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(animate);
    }
  }

  var animationId = requestAnimationFrame(animate);
