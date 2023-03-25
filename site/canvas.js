
function initMap() {
    const mapElement = document.getElementById('map');
    const mapOptions = {
        zoom: 9,
        center: new google.maps.LatLng(44.3404, -6.9745), // New York coordinates as an example
        minZoom: 7,
        maxZoom: 10,
        restriction: {
            latLngBounds: {
                north: 45,
                south: 43,
                east: -6,
                west: -7.5,
            },
        },
        disableDefaultUI: true,
        
    };

    const map = new google.maps.Map(mapElement, mapOptions);

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
}

