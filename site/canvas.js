var map;
var canvas;
var ctx;

function drawTextOnCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the text settings
    const text = "Place a Dronebase on the coast";
    const fontFamily = "Arial";
    const color = "white";
    const textAlign = "center";
    const textBaseline = "middle";

    // Calculate the x and y position to center the text
    const x = canvas.width / 4;
    const y = canvas.height / 8;

    // Calculate the desired text width (80% of the canvas width)
    const desiredWidth = canvas.width * 0.7;

    // Set an initial font size
    let fontSize = 12;
    ctx.font = `${fontSize}px ${fontFamily}`;

    // Measure the text width with the current font size
    let textWidth = ctx.measureText(text).width;

    // Increase or decrease the font size until the text width is close to the desired width
    while (textWidth < desiredWidth * 0.95 || textWidth > desiredWidth * 1.05) {
        fontSize = fontSize * (desiredWidth / textWidth);
        ctx.font = `${fontSize}px ${fontFamily}`;
        textWidth = ctx.measureText(text).width;
    }

    // Write the text to the canvas
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
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
