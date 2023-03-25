var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = "white";
ctx.font = "10px Arial";
ctx.fillText("Hello, world!", 10, 10);