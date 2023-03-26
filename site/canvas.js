var map;
var canvas;
var ctx;

function drawTextOnCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas = document.getElementById("myCanvas");
    // Define the text settings
    const text = "Place a Dronebase on the coast";
    const font = "5vw Arial";
    const color = "white";
    const textAlign = "center";
    const textBaseline = "middle";

    // Calculate the x and y position to center the text
    const x = canvas.width / 4;
    const y = canvas.height / 8;
    if (isMobile()) {
        x = window.ClientRect.width / 4;
        y = window.ClientRect.height / 8;
        alert("ffuuuck");
    }
    

    // Write the text to the canvas
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
}
function isMobile() {
    const userAgent = window.navigator.userAgent;
    const mobileKeywords = ["Android", "iPhone", "iPad", "iPod", "Windows Phone", "BlackBerry"];

    return mobileKeywords.some((keyword) => userAgent.includes(keyword));
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
                drawTextOnCanvas();
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
    if (true) {

    }
    else {

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

drawTextOnCanvas();

// Add click event listener to the canvas
canvas.addEventListener("click", async function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();

    const land = await isLand(latitude, longitude);
    console.log(`Clicked on ${land ? "Land" : "Water"}`);
});
