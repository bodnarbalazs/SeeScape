var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var svg = new Image();
svg.src = "assets/europe.svg";

ctx.fillStyle = "rgb(24, 41, 85)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

svg.onload = function () {
    ctx.drawImage(svg, 0, 0, width, height);
};
