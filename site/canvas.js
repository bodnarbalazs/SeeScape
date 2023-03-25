
function initMap() {
    const response = await fetch('assets/mapOptions.json');
    const mapOptions = await response.json();

    const mapElement = document.getElementById('map');

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

