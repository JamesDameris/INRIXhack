import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImxwejljeTRsbjYiLCJ0b2tlbiI6eyJpdiI6ImJiYWYyMzQ0MDkwNGViZmEwOTZhYmQ3NzhlNjI0YWY5IiwiY29udGVudCI6ImNkNmJhOTQwMmNmYWVmNWQ5NzAyY2UyOTBhY2FiMmQyZTlmZDUzOTdiMDgxMzAzNTEwMDBkYzAwODBhZGM0ODExOTI5ZWIwNzBkNGYyMDYzYzg1ODA1ZGI0MThjOTIwZThjMjdlMWUzZGJiZTZkMzZmZmE1MDY4MGYzNDMxNjkyNGU1NWIyMTJmODRkNzdiMDVjZDliMjFkNjMwMzNiYzU5ZDgxNmQ1YTMwYjAyYzY2NjMzZGZmZWVlOTg4ODVkNzhlYmM5MzUyZjIzMWE3YmI3ZTNlNDIwNjZjMjIzYWM1MzIxZjIzM2VlZjJjN2U4OGQ1MGRlOThhZjJhOTIxODI4MDM5MjEyZTNjNTc2OGZlNTNlOTUyMGQxOTc5OThiYmMwZWNhNjU2Y2RjMTBkNzYzZmE2NDliOGY1Yjk3MTZkMDUzYjg4YTQxNjUxMTJkNmQzZDg3ZWIzOGYyN2ZlZWEwOGUwNDM4OTNiNjAxNDI4MjU2ZDc3ZjUzMjQ0YzE2ZmY2MDY0MDE4N2E2MDlkNmJiN2IwZDRkZmM1ZTRmMzNiZTg5MDNlNDc5MjA2NzVjZDE1NzlmMWIyMjJkN2ZjZDEwYzlmMzcwN2FkMGIyYTc2NjM5ZDNlNmRlMmQ2ODAyNmQ4Mzg0OTM0MGZhMTZmZWEzZDFmOTA1NGRkODRhOTQyOTI3NWRmOWM2MmM4MDU2OTAyMTQwNzBiYjA5ODIxOTM1MTRjOGVhZjEwMmIwODY0ZmYwMGU3NzhkZWE1NGNlYjNjMDExZDU0ZDhiN2FkN2NiZjhlMzc5NGY0ZDBmMWUxMWFiNTViY2MxZjIwNGQzYzc5ZGQyMGFhNTMwZjk1YTM1MWRlOGYyY2MxM2NmMzgxNjRiOWZkIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJiYmFmMjM0NDA5MDRlYmZhMDk2YWJkNzc4ZTYyNGFmOSIsImNvbnRlbnQiOiJlZTUwZGE2NTNhYzliYzY1ZTgwNmFlNTM2OWRlY2Y5MWNjZGI2MDgyOWY4YjE3MzkxZjM1YTA0NzhkYjc4NGY0MjMzZGY1MTQ1NzZlMGE0NDk5NmYwY2U1In0sImp0aSI6IjZhMWI2ZWM5LTdkYzYtNGQ3Zi05MTk1LWRhM2Y3ZDIyMTEwMiIsImlhdCI6MTYzNjg2NzkxNSwiZXhwIjoxNjM2ODcxNTE1fQ.Z33YgxyrXaA54s0Q0oilvQDL6t0dJZULcUIKeiRHzls"
var urlincident = "https://api.iq.inrix.com/v1/incidents?box=37.81154996811045%7C-122.53116454369045%2C37.709691538514235%7C-122.34959352631057&incidentoutputfields=All&incidenttype=Incidents&locale=en"
var urlroute = "https://api.iq.inrix.com/findRoute?wp_1=37.771305%2C-122.424255&wp_2=37.778340%2C-122.423349&maxAlternates=2&routeOutputFields=p&format=json"
var urlslow = "https://api.iq.inrix.com/v1/dangerousSlowdowns?box=37.81154996811045%7C-122.53116454369045%2C37.709691538514235%7C-122.34959352631057&units=1"

async function test() {
    const res = await fetch(urlincident, {
        headers: {
            "Authorization": token
        }
    });
    const myJson = await res.json();
    return myJson;
}
var itemInc = await test();

async function test1() {
const res2 = await fetch(urlroute, {
    headers: {
        "Authorization": token
    }
    });
    const myJson1 = await res2.json();
    return myJson1;
}
var itemRoute = await test1();

async function test2() {
    const res2 = await fetch(urlslow, {
        headers: {
            "Authorization": token
        }
        });
        const myJson1 = await res2.json();
        return myJson1;
    }
var Dangslow = await test2();

//console.log("road:", itemInc.result.incidents[0].parameterizedDescription.roadName);
//console.log("here: ", itemInc.result.incidents[0])
//pushing all coordinates (incidences, dangerous slow downs)
var incArray = []; //incident array
for (let i = 0; i < itemInc.result.incidents.length; ++i) {
    incArray.push(itemInc.result.incidents[i]);
}

var sevArray = []; //severity of incident
var totArray = []; //incident array with dangerous slow downs

for (let i = 0; i < itemInc.result.incidents.length; ++i) {
    totArray.push(itemInc.result.incidents[i]);
    sevArray.push(itemInc.result.incidents[i].severity)
}
for (let i = 0; i < Dangslow.result.dangerousSlowdowns.length; ++i) {
    totArray.push(Dangslow.result.dangerousSlowdowns[i].location.geometry.coordinates);
    sevArray.push(Dangslow.result.dangerousSlowdowns[i].severity);
}

function incident_on_route() {
    var incCounter = [itemRoute.result.trip.routes.length];
    for (let init = 0; init < itemRoute.result.trip.routes.length; ++init) {
        incCounter[init] = 0;
    }
   // all coordinates for incidents stored in incArray
   // go through all coordinate points in route and compare to incident coords
    for(let i = 0; i < itemRoute.result.trip.routes.length; ++i) // iterate through the routes
    {
        for(let j = 0; j < totArray.length; ++j) 
        {    
            for(let k = 0; k < itemRoute.result.trip.routes[i].points.coordinates.length; ++k)
            { 
                //console.log("Difference: ", Math.abs(incArray[j].geometry.coordinates[0]-itemRoute.result.trip.routes[i].points.coordinates[k][0]));
                // Comparing the Coordinates of the Incident and the points on the route
                if((Math.abs(itemRoute.result.trip.routes[i].points.coordinates[k][1] - totArray[j][1])) <= 0.001 
                && Math.abs(totArray[j][0]-itemRoute.result.trip.routes[i].points.coordinates[k][0]) <= 0.001
                ){
                    
                    incCounter[i] += sevArray[j];
                    break;
                }
            }
        }  
    }
    return incCounter;
    //if coordinates are within certain range(will not be exact coords)
}
var incidents = incident_on_route();
console.log(incidents);
console.log(itemInc.result.incidents.length);


function avoidance() {
    for (let j = 0; j < incArray.length; ++j) {
        for (let k = 0; k < itemRoute.result.trip.routes[0].summary.roads.length; ++k) {
            console.log("Route roads: ",itemRoute.result.trip.routes[0].summary.roads[k].name.toLowerCase());
            console.log("Incident roads: ",incArray[j].parameterizedDescription.roadName);
            if (incArray[j].parameterizedDescription.roadName.toLowerCase() == itemRoute.result.trip.routes[0].summary.roads[k].name.toLowerCase()) {
                console.log("Avoid!");
                return;
            }
        }
    }
    console.log("Take Route!");
    return;
}

//avoidance();
