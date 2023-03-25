var map;

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
    const apiKey = "AIzaSyD8H08Wmk0JAuf8C91jD-oQOVDRuUkqDyk";
    const apiUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
            const elevation = data.results[0].elevation;
            return elevation > 0;
        } else {
            throw new Error(`Elevation API error: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching elevation data:", error);
        return false;
    }
}
