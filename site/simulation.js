setTimeout(() => {
    console.log(canvas.width);
}, 1000);

count = 0;
function place_loc(longitude, latitude, x, y){
    if (latitude<43.59) {
        if (count == 0){
            document.getElementById("droneBase").style.display = "block";
            document.getElementById("droneBase").style.top = y;
            document.getElementById("droneBase").style.left = x;
            count = 0;
            console.log("tök")
        };
    }
    
}