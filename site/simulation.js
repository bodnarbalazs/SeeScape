setTimeout(() => {
    console.log(canvas.width);
}, 1000);

latitude = canvas.latitude;
longitude = canvas.longitude;
setTimeout(() => {
    console.log("elso" + latitude);
    console.log("elso long" + longitude);
}, 2000);

setTimeout(() => {
    console.log("2" + latitude);
    console.log("2 long" + longitude);
}, 4000);