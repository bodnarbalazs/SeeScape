var map;

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
            };

            window.addEventListener("resize", resizeMap);
            resizeMap();

            google.maps.event.addListener(map, "click", async function (event) {
                const latitude = event.latLng.lat();
                const longitude = event.latLng.lng();
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
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
            const types = data.results[0].types;
            return !types.includes("natural_feature") || types.includes("establishment");
        } else {
            throw new Error(`Geocoding API error: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return false;
    }
}

// Get the canvas element and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

// Define the text settings
const text = "Place a Dronebase on the coast";
const x = canvas.width / 4; // center horizontally
const y = canvas.height / 20; // center vertically
const font = "5vw Arial";
const color = "white";
const textAlign = "center";

// Write the text to the canvas
ctx.fillStyle = color;
ctx.font = font;
ctx.textAlign = textAlign;
ctx.fillText(text, x, y);

// Add click event listener to the canvas
canvas.addEventListener("click", async function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();

    const land = await isLand(latitude, longitude);
    console.log(`Clicked on ${land ? "Land" : "Water"}`);
});
