var map;
var canvas;
var ctx;

var longitude = ""
var latitude = 50

function displayText(text) {
    var textElement = document.createElement("h1");

    textElement.textContent = text;
    textElement.class = "displayText";

    document.body.appendChild(textElement);
}



async function initMap() {
    loadMapOptions()
        .then((data) => {
            const mapOptions = data.mapOptions;
            const mapStyles = data.mapStyles;

            const mapElement = document.getElementById("map");
            map = new google.maps.Map(mapElement, mapOptions);
            map.setOptions({ styles: mapStyles });

            const resizeMap = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                mapElement.style.width = `${width}px`;
                mapElement.style.height = `${height}px`;
                google.maps.event.trigger(map, "resize");

                canvas.width = canvas.clientWidth * ratio;
                canvas.height = canvas.clientHeight * ratio;
                ctx.scale(ratio, ratio);
            };

            window.addEventListener("resize", resizeMap);
            resizeMap();
            displayText("Place a drone base on the coast");
            google.maps.event.addListener(map, "click", async function (event) {
                latitude = event.latLng.lat();
                longitude = event.latLng.lng();
                console.log("Clicked coordinates:", latitude, longitude);
                const land = await isLand(latitude, longitude);
                console.log(land ? "Land" : "Water");
            });

        })
        .catch((error) => console.error("Error fetching map options:", error));
}

document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    console.log("X és Y:", x, y);

    place_loc(longitude, latitude, x, y)
});

async function loadMapOptions() {
    const response = await fetch("assets/mapOptions.json");
    const data = await response.json();
    return data;
}

async function isLand(latitude, longitude) {
    if (latitude<43.59) {
        return true;
    }
    else {
        return false;
    }
}

// Get the canvas element and context
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

const devicePixelRatio = window.devicePixelRatio || 1;
const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
const ratio = devicePixelRatio / backingStoreRatio;
canvas.width = canvas.clientWidth * ratio;
canvas.height = canvas.clientHeight * ratio;
ctx.scale(ratio, ratio);

// Add click event listener to the canvas
canvas.addEventListener("click", async function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();

    const land = await isLand(latitude, longitude);
    console.log(`Clicked on ${land ? "Land" : "Water"}`);
});

// var startX = 1200;
// var startY = 300;
// var endX = 500;
// var endY = 200;

// var x = startX;
// var y = startY;
// var DiffX = Math.abs(endX - startX) / 100;
// var DiffY = Math.abs(endY - startY) / 100;

// if (startX > endX) {
//   DiffX = -DiffX;
// }
// if (startY > endY) {
//   DiffY = -DiffY;
// }

// ctx.strokeStyle = '#fffff';
// ctx.lineWidth = 3;

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.moveTo(startX, startY);
//   ctx.lineTo(x, y);
//   ctx.shadowBlur = 10;
//   ctx.shadowColor = 'white';
//   ctx.strokeStyle = 'white';
//   ctx.stroke();

//   x += DiffX;
//   y += DiffY;

//   if ((DiffX > 0 && x > endX) || (DiffX < 0 && x < endX) || (DiffY > 0 && y > endY) || (DiffY < 0 && y < endY)) {
//     //console.log("Vége öreg");
//   } else {
//     animationId = requestAnimationFrame(animate);
//   }
// }
// var animationId = requestAnimationFrame(animate);


// animation
var count = 0;
var Baselongitude = "";
var Baselatitude = "";
var Boatlongitude = "";
var Boatlatitude = "";
var basex = "";
var basey = "";
var x = "";
var y = "";

function place_loc(longitude, latitude, x, y){
    
    console.log("count" + count);

    if (latitude<43.59) {
        if (count == 0){
            document.getElementById("droneBase").style.display = "block";
            document.getElementById("droneBase").style.top = y + "px";
            document.getElementById("droneBase").style.left = x + "px";
            document.getElementById("instruction").innerHTML = "Choose a location for a boat on water!";
            console.log("tök");
            
            count += 1;
            
            basex = x;
            basey = y;

            Baselongitude = longitude;
            Baselatitude = latitude;

            console.log("count" + count);
        };
    }

    if (latitude>43.59) {
        if (count == 1) {
            document.getElementById("boat").style.display = "block";
            document.getElementById("boat").style.top = y + "px";
            document.getElementById("boat").style.left = x + "px";
            
            Boatlongitude = longitude;
            Boatlatitude = latitude;
            
            var distance = distance_func(Baselatitude,Baselongitude,Boatlatitude,Boatlongitude);
            distance = distance.toFixed(2)
            document.getElementById("instruction").innerHTML = "The distance between the boat and the base: " + distance + "km";
            count += 2;
            console.log("count" + count);

            // dotted line
            // var startX = basex+15;
            // var startY = basey;
            // var endX = x+15;
            // var endY = y;

            // var lx = startX;
            // var ly = startY;
            // var DiffX = Math.abs(endX - startX) / 100;
            // var DiffY = Math.abs(endY - startY) / 100;

            // if (startX > endX) {
            // DiffX = -DiffX;
            // }
            // if (startY > endY) {
            // DiffY = -DiffY;
            // }

            // ctx.strokeStyle = '#fffff';
            // ctx.lineWidth = 3;

            // function animate() {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ctx.beginPath();
            // ctx.moveTo(startX, startY);
            // ctx.lineTo(lx, ly);
            // ctx.shadowBlur = 10;
            // ctx.shadowColor = 'white';
            // ctx.strokeStyle = 'white';
            // ctx.stroke();

            // lx += DiffX;
            // ly += DiffY;

            // if ((DiffX > 0 && lx > endX) || (DiffX < 0 && lx < endX) || (DiffY > 0 && ly > endY) || (DiffY < 0 && ly < endY)) {
            //     //console.log("Vége öreg");
            // } else {
            //     animationId = requestAnimationFrame(animate);
            // }
            // }
            // var animationId = requestAnimationFrame(animate);
            // dotted line
            setTimeout(function() {
                document.getElementById("droneTop").style.display = "block";
                document.getElementById("droneTop").classList.add('droneTop_animate');
                document.getElementById("droneTop").style.top = basey + "px";
                document.getElementById("droneTop").style.left = basex + "px";
                const style = document.createElement('style');
                console.log(basex, basey);
                style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
                document.head.appendChild(style);
            }, 3000);
            
            setTimeout(function() {
                document.getElementById("policeBoat").style.display = "block";
                document.getElementById("policeBoat").classList.add('policeboat_animate');
                document.getElementById("policeBoat").style.top = basey + "px";
                document.getElementById("policeBoat").style.left = basex + "px";
                const style = document.createElement('style');
                console.log(basex, basey);
                style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
                document.head.appendChild(style);
            }, 8500);

            const list = ["You found a pirate!", "You found a drug smuggler!", "You found a boat full of exiles!", "You fund an illegal fisherman!"];
            const randomIndex = Math.floor(Math.random() * list.length);
            const randomElement = list[randomIndex];

            setTimeout(function() {
                document.getElementById("instruction").innerHTML = randomElement;
              }, 8000);
            
            
        }   

    }
    
}

function distance_func(Baselatitude, Baselongitude, Boatlatitude, Boatlongitude) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(Boatlatitude - Baselatitude);
    const dLon = deg2rad(Boatlongitude - Baselongitude); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(Baselatitude)) * Math.cos(deg2rad(Boatlatitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}


document.addEventListener("click", place_loc (longitude, latitude, x, y))
