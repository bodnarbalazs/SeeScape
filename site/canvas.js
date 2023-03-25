
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
