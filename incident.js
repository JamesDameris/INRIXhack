import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imp6eDV4NzFtYTQiLCJ0b2tlbiI6eyJpdiI6ImIyMTQ4MWUxOTczN2U1NzU1MTJmOTIzNTZjOTY2OTI3IiwiY29udGVudCI6IjUxZDFmNTcyODAxNmU2NDUyMGYxNWNmYTIxZmMwNjZjYWY2ZWY2OGY1NjVkOGUyMGFlYWVlZGE5MjY4NmQ2MWFiZTI3MzY3NmU1ZjE3ZTViOWFlMWIwNmZlN2QzNGYxMGZiZGNmZjc2OTVhZmYzZDUwMDI0ZWRkZWFmYTBjNDVhYTA1NGU1MzlkNWQ0ODQ5YTBkMjVmODJjMzIwZDY5M2I5NDJkMTcwNzI2NWFmZTg4YTRkNTNmYjkxMjQzZTU3NmNjNzIxZDIzOThkMjUyNWIzZDUxMjllNzdmMzBmMTk0MDc3NTE5NzZhMWNlZTA5YTk4Y2JjZWM2YTVlMDQ0ZDM0YjMxYmVmMzg4YWFiMjMzMzExMDFjNGZkNzMyZmVlZDZlZTVhNzc4MGM3Zjg5OTg0MWQ2MGY2ZmU0Njc4NzRiYTAxNDY0ZjIzOGE5Mjg3ZWYyNGI3MDM4MDVlMWVmOGQ4MGRkMmFiNmFjYWI0OWIwMzVhNGE5N2Y3NDc4OGNmNWEwOGY2YzNiMTQyYmJjN2ZkOWU2ZWU0YjgwYTA5OGNmZDMzODA3ZDY3MGJhOTYxOTdmN2Y5NTMyNmRkZjJkMWVlNmY2OWZlZjg4ZGM0YjMwMWJiMTQzYmI0MDIxNjI1YWM1YzU3NGM1NDJjMDE5ZDEzOThjYjU3MGQ3ZGM1MDRmNjYzNTVlMmMwNDI0OGYyYTE0NWEzZjNkNTQzMDQ2OWIyNTQ2NjMzMGM1MzI0ZDg1ZDU1ZGU0NWU0YjBlYjBiYTFkMTdjM2VmZjQ5MDJlYjgwZDI3YjBkOTc0YWRlNmRmMzY4MzEzM2JjZWI2NzVhYTg3Y2IxMmY2M2E2MjQwYjhhMTE4MTA0ZDYwY2RjZDlhZTFiNGUxIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJiMjE0ODFlMTk3MzdlNTc1NTEyZjkyMzU2Yzk2NjkyNyIsImNvbnRlbnQiOiI2MWVjZDA1ZmI3MzNlMjY4NDVkMDViY2IxNWMwMTUzZThmMzE5MmE2NzE1Y2IzNTE5Y2EwY2FhYTA4ZGVjZDZmODEzZDBhM2Y4NmZmNTUyNGMzYzk5NzUxIn0sImp0aSI6Ijk4OTM0ZmYwLTFhNmUtNDg1OC1hOGE5LWU2Nzc3ZWM4ZDVhYiIsImlhdCI6MTYzNjg3NjA5MiwiZXhwIjoxNjM2ODc5NjkxfQ.ieOm3F1q0FY0VnqQ0YJl7N37-ZxNol6rCT2UIqH6vas"
var urlincident = "https://api.iq.inrix.com/v1/incidents?box=37.757387%7C-122.490667%2C37.746138%7C-122.395481&incidentoutputfields=All&incidenttype=Incidents,Flow,Construction&locale=en"
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
    totArray.push(itemInc.result.incidents[i].geometry.coordinates);
    sevArray.push(itemInc.result.incidents[i].severity)
}
for (let i = 0; i < Dangslow.result.dangerousSlowdowns.length; ++i) {
    totArray.push(Dangslow.result.dangerousSlowdowns[i].location.geometry.coordinates);
    sevArray.push(Dangslow.result.dangerousSlowdowns[i].severity);
}

var dummyIncident = [-122.42241382598877, 37.77271270751953];
var dummySeverity = 3;
totArray.push(dummyIncident);
sevArray.push(dummySeverity);

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
//console.log(itemRoute.result.trip.routes[0].points.coordinates.length);
//console.log(totArray);

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

for (let x = 0; x < itemRoute.result.trip.routes[0].points.coordinates.length; ++x) {
    console.log(itemRoute.result.trip.routes[0].points.coordinates[x]);
}