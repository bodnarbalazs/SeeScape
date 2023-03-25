
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
      const x = canvas.width / 2; // center horizontally
      const y = canvas.height / 10; // center vertically
      const font = '1vw Arial';
      const color = 'white';
      const textAlign = 'center';

      // Write the text to the canvas
      ctx.fillStyle = color;
      ctx.font = font;
      ctx.textAlign = textAlign;
      ctx.fillText(text, x, y);
