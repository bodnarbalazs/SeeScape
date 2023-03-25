const canvas = document.getElementById('canvas');
function initMap() {
    canvas = document.getElementById('canvas');
    const mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(40.7128, -74.0060), // New York coordinates as an example
        disableDefaultUI: true,
    };

    const map = new google.maps.Map(canvas, mapOptions);

    const resizeMap = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
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


