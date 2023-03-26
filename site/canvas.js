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
  } else {
    animationId = requestAnimationFrame(animate);
  }
}
var animationId = requestAnimationFrame(animate);


// animation
var count = 0;
var Baselongitude = "";
var Baselatitude = "";
var Boatlongitude = "";
var Boatlatitude = "";



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
            
            var distance = distance(Baselongitude,Baselatitude,Boatlongitude,Boatlatitude);
            document.getElementById("instruction").innerHTML = "The distance between the boat and the base: " + distance;
            count += 2;
            console.log("count" + count);
        }
    }
    
}

function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


document.addEventListener("click", place_loc (longitude, latitude, x, y))
