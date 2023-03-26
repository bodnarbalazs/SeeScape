// Variables
var map, canvas, ctx;
var longitude = "";
var latitude = 50;
var count = 0;
var Baselongitude = "", Baselatitude = "", Boatlongitude = "", Boatlatitude = "";
var basex = "", basey = "", x = "", y = "";

// Functions
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

async function loadMapOptions() {
    const response = await fetch("assets/mapOptions.json");
    const data = await response.json();
    return data;
}

async function isLand(latitude, longitude) {
    if (latitude < 43.59) {
        return true;
    } else {
        return false;
    }
}

function place_loc(longitude, latitude, x, y) {
    // ...
}

function distance_func(Baselatitude, Baselongitude, Boatlatitude, Boatlongitude) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(Boatlatitude - Baselatitude);
    const dLon = deg2rad(Boatlongitude - Baselongitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(Baselatitude)) * Math.cos(deg2rad(Boatlatitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function setAnimationStyles(basey, basex, y, x) {
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes my-animation {
      0% { top: ${basey}px; left: ${basex}px; }
      49% { transform: rotate(0deg); }
      50% { top: ${y}px; left: ${x}px; transform: rotate(180deg); }
      100% { top: ${basey}px; left: ${basex}px; transform: rotate(180deg); }
    }
  `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    console.log("X and Y:", x, y);

    place_loc(longitude, latitude, x, y)
});

canvas.addEventListener("click", async function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();

    const land = await isLand(latitude, longitude);

    if (land) {
        if (count === 0) {
            basey = y;
            basex = x;
            count++;
        } else {
            setAnimationStyles(basey, basex, y, x);
        }
    }
});

// Initialize Map
initMap();
