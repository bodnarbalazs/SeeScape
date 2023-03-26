var map;
var canvas;
var ctx;

var longitude = ""
var latitude = 50

function displayText(text) {
    var textElement = document.createElement("h1");

    textElement.textContent = text;
    textElement.class = "displayText";

    document.body.appendChild(textElement);
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
            };

            window.addEventListener("resize", resizeMap);
            resizeMap();
            displayText("Place a drone base on the coast");
            google.maps.event.addListener(map, "click", async function (event) {
                latitude = event.latLng.lat();
                longitude = event.latLng.lng();
                console.log("Clicked coordinates:", latitude, longitude);
                const land = await isLand(latitude, longitude);
                console.log(land ? "Land" : "Water");
            });

        })
        .catch((error) => console.error("Error fetching map options:", error));
}

document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    console.log("X és Y:", x, y);

    place_loc(longitude, latitude, x, y)
});

async function loadMapOptions() {
    const response = await fetch("assets/mapOptions.json");
    const data = await response.json();
    return data;
}

async function isLand(latitude, longitude) {
    if (latitude<43.59) {
        return true;
    }
    else {
        return false;
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

// Add click event listener to the canvas
canvas.addEventListener("click", async function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const latitude = map.getCenter().lat();
    const longitude = map.getCenter().lng();

    const land = await isLand(latitude, longitude);
    console.log(`Clicked on ${land ? "Land" : "Water"}`);
});

// var startX = 1200;
// var startY = 300;
// var endX = 500;
// var endY = 200;

// var x = startX;
// var y = startY;
// var DiffX = Math.abs(endX - startX) / 100;
// var DiffY = Math.abs(endY - startY) / 100;

// if (startX > endX) {
//   DiffX = -DiffX;
// }
// if (startY > endY) {
//   DiffY = -DiffY;
// }

// ctx.strokeStyle = '#fffff';
// ctx.lineWidth = 3;

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.moveTo(startX, startY);
//   ctx.lineTo(x, y);
//   ctx.shadowBlur = 10;
//   ctx.shadowColor = 'white';
//   ctx.strokeStyle = 'white';
//   ctx.stroke();

//   x += DiffX;
//   y += DiffY;

//   if ((DiffX > 0 && x > endX) || (DiffX < 0 && x < endX) || (DiffY > 0 && y > endY) || (DiffY < 0 && y < endY)) {
//     //console.log("Vége öreg");
//   } else {
//     animationId = requestAnimationFrame(animate);
//   }
// }
// var animationId = requestAnimationFrame(animate);


// animation
// var count = 0;
// var Baselongitude = "";
// var Baselatitude = "";
// var Boatlongitude = "";
// var Boatlatitude = "";
// var basex = "";
// var basey = "";
// var x = "";
// var y = "";

// function place_loc(longitude, latitude, x, y){
    
//     console.log("count" + count);

//     if (latitude<43.59) {
//         if (count == 0){
//             document.getElementById("droneBase").style.display = "block";
//             document.getElementById("droneBase").style.top = y + "px";
//             document.getElementById("droneBase").style.left = x + "px";
//             document.getElementById("instruction").innerHTML = "Choose a location for a boat on water!";
//             console.log("tök");
            
//             count += 1;
            
//             basex = x;
//             basey = y;

//             Baselongitude = longitude;
//             Baselatitude = latitude;

//             console.log("count" + count);
//         };
//     }

//     if (latitude>43.59) {
//         if (count == 1) {
//             document.getElementById("boat").style.display = "block";
//             document.getElementById("boat").style.top = y + "px";
//             document.getElementById("boat").style.left = x + "px";
            
//             Boatlongitude = longitude;
//             Boatlatitude = latitude;
            
//             var distance = distance_func(Baselatitude,Baselongitude,Boatlatitude,Boatlongitude);
//             distance = distance.toFixed(2)
//             document.getElementById("instruction").innerHTML = "The distance between the boat and the base: " + distance + "km";
//             count += 2;
//             console.log("count" + count);

//             // dotted line
//             // var startX = basex+15;
//             // var startY = basey;
//             // var endX = x+15;
//             // var endY = y;

//             // var lx = startX;
//             // var ly = startY;
//             // var DiffX = Math.abs(endX - startX) / 100;
//             // var DiffY = Math.abs(endY - startY) / 100;

//             // if (startX > endX) {
//             // DiffX = -DiffX;
//             // }
//             // if (startY > endY) {
//             // DiffY = -DiffY;
//             // }

//             // ctx.strokeStyle = '#fffff';
//             // ctx.lineWidth = 3;

//             // function animate() {
//             // ctx.clearRect(0, 0, canvas.width, canvas.height);

//             // ctx.beginPath();
//             // ctx.moveTo(startX, startY);
//             // ctx.lineTo(lx, ly);
//             // ctx.shadowBlur = 10;
//             // ctx.shadowColor = 'white';
//             // ctx.strokeStyle = 'white';
//             // ctx.stroke();

//             // lx += DiffX;
//             // ly += DiffY;

//             // if ((DiffX > 0 && lx > endX) || (DiffX < 0 && lx < endX) || (DiffY > 0 && ly > endY) || (DiffY < 0 && ly < endY)) {
//             //     //console.log("Vége öreg");
//             // } else {
//             //     animationId = requestAnimationFrame(animate);
//             // }
//             // }
//             // var animationId = requestAnimationFrame(animate);
//             // dotted line
//             setTimeout(function() {
//                 document.getElementById("droneTop").style.display = "block";
//                 document.getElementById("droneTop").classList.add('droneTop_animate');
//                 document.getElementById("droneTop").style.top = basey + "px";
//                 document.getElementById("droneTop").style.left = basex + "px";
//                 const style = document.createElement('style');
//                 console.log(basex, basey);
//                 style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
//                 document.head.appendChild(style);
//             }, 1000);

//             setTimeout(function() {
//                 document.getElementById("droneTop").style.display = "none";
//             }, 9500);

//             setTimeout(function() {
//                 document.getElementById("policeBoat").style.display = "none";
//             }, 21000);
            
//             setTimeout(function() {
//                 document.getElementById("policeBoat").style.display = "block";
//                 document.getElementById("policeBoat").classList.add('policeboat_animate');
//                 document.getElementById("policeBoat").style.top = basey + "px";
//                 document.getElementById("policeBoat").style.left = basex + "px";
//                 const style = document.createElement('style');
//                 console.log(basex, basey);
//                 style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
//                 document.head.appendChild(style);
//             }, 5000);

//             const list = ["You've found illegal pirates!", "You've found a drug smugglers boat!", "You've found human traffickers!", "You've found marine poachers!", "You've found a ship dumping oil into the sea!"];
//             const randomIndex = Math.floor(Math.random() * list.length);
//             const randomElement = list[randomIndex];

//             setTimeout(function() {
//                 document.getElementById("instruction").innerHTML = randomElement;
//             }, 5000);

//             setTimeout(function() {
//                 document.getElementById("demoLink2").style.display = "block";
//             }, 21000);
            
            
//         }   

//     }
    
// }

// function distance_func(Baselatitude, Baselongitude, Boatlatitude, Boatlongitude) {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(Boatlatitude - Baselatitude);
//     const dLon = deg2rad(Boatlongitude - Baselongitude); 
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(Baselatitude)) * Math.cos(deg2rad(Boatlatitude)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2); 
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     const d = R * c; // Distance in km
//     return d;
// }
  
// function deg2rad(deg) {
//     return deg * (Math.PI/180)
// }

b1 = 0;
b2 = 0;
b3 = 0;
active = 0;
activeb = 0;

function boat1(){

    if (b1 ==0 && active == 0){
        active = 1;
        var basex1 = 541;
        var basey1 = 1670;
        var x1 = 121;
        var y1 = 695;
        document.getElementById("droneTop").style.display = "block";
        document.getElementById("droneTop").classList.add('droneTop_animate');
        document.getElementById("droneTop").style.top = basey1 + "px";
        document.getElementById("droneTop").style.left = basex1 + "px";
        const style = document.createElement('style');
        console.log(basex1, basey1);
        style.innerHTML = "@keyframes my-animation {0% {top: " + basey1 + "px; left: "+basex1+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y1 + "px; left: "+x1+"px; transform: rotate(180deg);} 100% {top: " + basey1 + "px; left: "+basex1+"px; transform: rotate(180deg);}}";
        document.head.appendChild(style);

        setTimeout(function() {
            document.getElementById("droneTop").classList.remove('droneTop_animate');
            document.head.removeChild(style)
        }, 8000);

        setTimeout(function() {
            const info = document.createElement('h2')
            info.innerHTML = "IMO8364936 <br> Legal fishing"
            document.getElementById("boatlable1").appendChild(info)
        }, 4000);

        setTimeout(function() {
            active = 0;
        }, 8000);
        
        b1 = 1;
    }
    
}

function boat2(){
    if (active == 0){
        active = 1;
        var basex2 = 541;
        var basey2 = 1670;
        var x2 = 477;
        var y2 = 510;
        document.getElementById("droneTop").style.display = "block";
        document.getElementById("droneTop").classList.add('droneTop_animate');
        document.getElementById("droneTop").style.top = basey2 + "px";
        document.getElementById("droneTop").style.left = basex2 + "px";
        const styled = document.createElement('style');
        console.log(basex2, basey2);
        styled.innerHTML = "@keyframes my-animation {0% {top: " + basey2 + "px; left: "+basex2+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y2 + "px; left: "+x2+"px; transform: rotate(180deg);} 100% {top: " + basey2 + "px; left: "+basex2+"px; transform: rotate(180deg);}}";
        document.head.appendChild(styled);

        setTimeout(function() {
            document.getElementById("droneTop").classList.remove('droneTop_animate');
            document.head.removeChild(styled)
        }, 8000);

        setTimeout(function() {
            const info = document.createElement('h2')
            info.classList.add("criminal")
            info.innerHTML = "IMO234945 <br> Dumping oil"
            document.getElementById("boatlable2").appendChild(info)
        }, 4000);


        setTimeout(function() {
            if (activeb == 0){
                activeb = 1;
                document.getElementById("policeBoat").style.display = "block";
                document.getElementById("policeBoat").classList.add('policeboat_animate');
                document.getElementById("policeBoat").style.top = basey2 + "px";
                document.getElementById("policeBoat").style.left = basex2 + "px";
                const styleb = document.createElement('style');
                console.log(basex2, basey2);
                styleb.innerHTML = "@keyframes my-animation2 {0% {top: " + basey2 + "px; left: "+basex2+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y2 + "px; left: "+x2+"px; transform: rotate(180deg);} 100% {top: " + basey2 + "px; left: "+basex2+"px; transform: rotate(180deg);}}";
                document.head.appendChild(styleb);

                setTimeout(function() {
                    activeb = 0;
                }, 21000);
            }
            else{
                setTimeout(function() {
                    activeb = 1;
                    document.getElementById("policeBoat").style.display = "block";
                    document.getElementById("policeBoat").classList.add('policeboat_animate');
                    document.getElementById("policeBoat").style.top = basey2 + "px";
                    document.getElementById("policeBoat").style.left = basex2 + "px";
                    const styleb = document.createElement('style');
                    console.log(basex2, basey2);
                    styleb.innerHTML = "@keyframes my-animation2 {0% {top: " + basey2 + "px; left: "+basex2+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y2 + "px; left: "+x2+"px; transform: rotate(180deg);} 100% {top: " + basey2 + "px; left: "+basex2+"px; transform: rotate(180deg);}}";
                    document.head.appendChild(styleb);

                    setTimeout(function() {
                        activeb = 0;
                    }, 21000);
                }, 13000);
            }
           
        }, 5000);

        setTimeout(function() {
            document.getElementById("policeBoat").classList.remove('policeBoat_animate');
            document.head.removeChild(styleb);
        }, 21000);


        setTimeout(function() {
            active = 0;
        }, 8000);
        
        b2 = 1;
    }
    
}

function boat3(){
    if (b3 ==0 && active == 0){
        active = 1;
        var basex = 541;
        var basey = 1670;
        var x = 720;
        var y = 870;
        document.getElementById("droneTop").style.display = "block";
        document.getElementById("droneTop").classList.add('droneTop_animate');
        document.getElementById("droneTop").style.top = basey + "px";
        document.getElementById("droneTop").style.left = basex + "px";
        const style = document.createElement('style');
        console.log(basex, basey);
        style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
        document.head.appendChild(style);

        setTimeout(function() {
            document.getElementById("droneTop").classList.remove('droneTop_animate');
            document.head.removeChild(style)
        }, 8000);

        setTimeout(function() {
            const info = document.createElement('h2')
            info.classList.add("criminal")
            info.innerHTML = "IMO485736 <br> Illegal fishing"
            document.getElementById("boatlable3").appendChild(info)
        }, 4000);

        setTimeout(function() {
            if (activeb == 0){
                activeb = 1;
                document.getElementById("policeBoat").style.display = "block";
                document.getElementById("policeBoat").classList.add('policeboat_animate');
                document.getElementById("policeBoat").style.top = basey + "px";
                document.getElementById("policeBoat").style.left = basex + "px";
                const styleb = document.createElement('style');
                console.log(basex, basey);
                styleb.innerHTML = "@keyframes my-animation2 {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
                document.head.appendChild(styleb);

                setTimeout(function() {
                    activeb = 0;
                }, 17000);
            }
            else{
                setTimeout(function() {
                    activeb = 1;
                    document.getElementById("policeBoat").style.display = "block";
                    document.getElementById("policeBoat").classList.add('policeboat_animate');
                    document.getElementById("policeBoat").style.top = basey2 + "px";
                    document.getElementById("policeBoat").style.left = basex2 + "px";
                    const styleb = document.createElement('style');
                    console.log(basex2, basey2);
                    styleb.innerHTML = "@keyframes my-animation2 {0% {top: " + basey2 + "px; left: "+basex2+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y2 + "px; left: "+x2+"px; transform: rotate(180deg);} 100% {top: " + basey2 + "px; left: "+basex2+"px; transform: rotate(180deg);}}";
                    document.head.appendChild(styleb);

                    setTimeout(function() {
                        activeb = 0;
                    }, 17000);
                }, 9000);
            }
        }, 5000);

        setTimeout(function() {
            document.getElementById("policeBoat").classList.remove('policeBoat_animate');
            document.head.removeChild(styleb);
        }, 17000);

        setTimeout(function() {
            active = 0;
        }, 8000);
        
        b3 = 1;
    }
}



// document.getElementById("policeBoat").style.display = "block";
// document.getElementById("policeBoat").classList.add('policeboat_animate');
// document.getElementById("policeBoat").style.top = basey + "px";
// document.getElementById("policeBoat").style.left = basex + "px";
// const style = document.createElement('style');
// console.log(basex, basey);
// style.innerHTML = "@keyframes my-animation {0% {top: " + basey + "px; left: "+basex+"px;} 49% {transform: rotate(0deg);} 50% {top: " + y + "px; left: "+x+"px; transform: rotate(180deg);} 100% {top: " + basey + "px; left: "+basex+"px; transform: rotate(180deg);}}";
// document.head.appendChild(style);

// document.addEventListener("click", place_loc (longitude, latitude, x, y))

