var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

var startX = 100;
var startY = 100;

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
    ctx.lineTo(endX, endY);
    ctx.stroke();
  
    // Update the starting point of the line
    startX += 1;
    startY += 1;
  
    // Stop the animation when the line reaches the endpoint
    if (startX >= endX && startY >= endY) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(animate);
    }
  }

  var animationId = requestAnimationFrame(animate);
