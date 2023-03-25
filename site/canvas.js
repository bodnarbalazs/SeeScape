var map;
var canvas;

function initMap() {
    loadMapOptions()
        .then((data) => {
            const mapOptions = data.mapOptions;
            const mapStyles = data.mapStyles;

            const mapElement = document.getElementById('map');
            map = new google.maps.Map(mapElement, mapOptions);
            map.setOptions({ styles: mapStyles });

            const resizeMap = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                mapElement.style.width = `${width}px`;
                mapElement.style.height = `${height}px`;
                google.maps.event.trigger(map, 'resize');
            };

            window.addEventListener('resize', resizeMap);
            resizeMap();

            // Add the transparent canvas overlay
            canvas = document.getElementById('myCanvas');
            canvas.addEventListener('click', getPixelColor, false);

            // Add click event listener to Google Maps instance
            google.maps.event.addListener(map, 'click', function (event) {
                getPixelColor(event);
            });
            const ctx = canvas.getContext('2d');

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
            const text = 'Place a Dronebase on the coast';
            const x = canvas.width / 4; // center horizontally
            const y = canvas.height / 20; // center vertically
            const font = '5vw Arial';
            const color = 'white';
            const textAlign = 'center';

            // Write the text to the canvas
            ctx.fillStyle = color;
            ctx.font = font;
            ctx.textAlign = textAlign;
            ctx.fillText(text, x, y);

        })
        .catch((error) => console.error('Error fetching map options:', error));
}

async function loadMapOptions() {
    const response = await fetch('assets/mapOptions.json');
    const data = await response.json();
    return data;
}

async function getPixelColor(event) {
    const { lat, lng, zoom } = getMapInfo();
    const x = event.offsetX;
    const y = event.offsetY;

    console.log(`Clicked coordinates (unscaled): ${x}, ${y}`);

    const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${canvas.width}x${canvas.height}&maptype=roadmap&key=AIzaSyD8H08Wmk0JAuf8C91jD-oQOVDRuUkqDyk`;

    const color = await getClickedPixelColor(imageURL, x, y);
    console.log(`Clicked pixel color: rgba(${color.join(',')})`);
}




function getMapInfo() {
    const center = map.getCenter();
    const lat = center.lat();
    const lng = center.lng();
    const zoom = map.getZoom();

    return { lat, lng, zoom };
}

async function getClickedPixelColor(imageURL, x, y) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageURL;

        img.onload = () => {
            const hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = img.width;
            hiddenCanvas.height = img.height;

            const ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Account for canvas scaling
            const devicePixelRatio = window.devicePixelRatio || 1;
            const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            const ratio = devicePixelRatio / backingStoreRatio;
            const scaledX = x * ratio;
            const scaledY = y * ratio;

            console.log(`Clicked coordinates (scaled): ${scaledX}, ${scaledY}`);

            const imageData = ctx.getImageData(scaledX, scaledY, 1, 1).data;
            resolve(imageData);
        };

        img.onerror = () => {
            reject('Error loading image');
        };
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

