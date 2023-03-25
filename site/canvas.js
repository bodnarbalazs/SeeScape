
function initMap() {
    loadMapOptions()
        .then((data) => {
            const mapOptions = data.mapOptions;
            const mapStyles = data.mapStyles;

            const mapElement = document.getElementById('map');
            const map = new google.maps.Map(mapElement, mapOptions);
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

            google.maps.event.addListener(map, 'click', function (event) {
                const latitude = event.latLng.lat();
                const longitude = event.latLng.lng();
                console.log('Clicked coordinates:', latitude, longitude);
            });
        })
        .catch((error) => console.error('Error fetching map options:', error));
}

async function loadMapOptions() {
    const response = await fetch('assets/mapOptions.json');
    const data = await response.json();
    return data;
}

      // Get the canvas element and context
      const canvas = document.getElementById('myCanvas');
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
      
      // Get the color of the point when it's clicked
      canvas.addEventListener("click", function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const imageData = context.getImageData(x, y, 1, 1);
        const color = imageData.data;
        console.log("Clicked point color:", color);
      });

      // Create a water layer
const waterLayer = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return "https://mt.google.com/vt/lyrs=s&x=" + coord.x + "&y=" + coord.y + "&z=" + zoom;
    },
    tileSize: new google.maps.Size(256, 256),
    name: "Water"
  });
  
  // Add the water layer to the map
  map.overlayMapTypes.push(waterLayer);
  
  // Add a click event listener to the map
  map.addListener("click", event => {
    // Get the location where the user clicked
    const latLng = event.latLng;
    // Check if the clicked location is water or land
    const point = new google.maps.Point(latLng.lng(), latLng.lat());
    if (waterLayer.getTileUrl(point, map.getZoom())) {
      console.log("The clicked location is water.");
    } else {
      console.log("The clicked location is land.");
    }
  });