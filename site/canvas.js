
function initMap() {
    const mapElement = document.getElementById('map');
    const mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(44.0404, -6.6645), // New York coordinates as an example
        minZoom: 5,
        maxZoom: 11,
        disableDefaultUI: true,
        mapId: '1a1947e4867678df'
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

