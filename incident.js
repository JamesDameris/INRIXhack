import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imp6eDV4NzFtYTQiLCJ0b2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6Ijc3YzhkNjVmNjM0ZmExMmMxNmU2M2MxMzc0MjQ5NjYyNmY0MmNlN2VkY2E5NDkzNDA4ZGZkOWQ2MjE3MDdlOTgzZWRhYzU2ZTc3ZGIwYWVmNDExNjE2YWI4YTU2MWQ4YjA3NDIwNWQxNWE5N2ZlZGE3Y2Q2ZmUxYzJlOTgxYTI3YWY1OTFkNGJhMTUyNTc3MGNjNTE5YjdhY2MxMDg5MGFmMzdlMmJmMTljNWNkODhhYWRhM2UzYTgzZDhkZGY5YTdmNTExNGQwMDJjYTZjOTFkYWYwMTE3MDVjYjIyOWFjY2RkYWIyOGYxNTVlMzc3ZWVkN2E3ODMwNGZlZWE4MzEwODcyZGI0MWUwMTJjYjAxZGQ1NzJiOWQxZTg3Mzk0MzI2M2E5NDU0NDYxNTU0OWVjZjhlNDI5MDViOWIzMjI0MGUxNmVmN2IwZDU0YTQwN2Y1OWQ4OTZkOTBmN2M2MDc4MzQyOWRjMTU5ODQyYTljNDZkMWRmODYxNzI0ODliMGIxMWNhM2YwMTBlYzY5MjhkNjdjNDc5ODYwNTA1YjQzN2Q3OWE3ZDVmMGU5ZGYzMDg5YTM1YWMxMjQ3NmFjNmZjNjBjNTBmZWUxNTQ2ZGI1MjlmZDA0YWY3OGZmYzNiOWMwYjhkNWMwZGNjNzAyZDcyNmY5ZmNjMjE3YzkzMzgxY2YzMWMxODRiZWEyNmFkYTcyYjVjMGQ3YWU2MTBjNjllOWJiYWU3ZjE3ZWFkNDNjNDc3ZmQ1MGU0OTc2M2ZhYjU5NTRjMjViZTZlNGM0N2ExMTY0MGUzZDJmYjc4ZGZmY2Y0YjY2MjU0M2YxMzQ4M2FiMGRlN2Y0ZjgwODMwYTRjNjU2OGM1ODFmMzlmNThkNDFhZWU4In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJkODJkMDI4ZjMzNDhhNzY0NmY3ZmYzZjVlNDM1YWIyNyIsImNvbnRlbnQiOiI3YWRlYzg0MjQ1M2Q4MzExNmFjMTNmMjgxNzM0YjYzMTE5NThhZDRjZDA4NDI5NmUyOGQyZDZhNDNhMmQ0NWY4MmVmZWJiMTIwM2YwMjJlYTFhNDIzZDk1In0sImp0aSI6ImRlNWRjNTAzLWFlZmUtNDY2MS1hMzJiLTA4YjQ0ZGY3ZjczNCIsImlhdCI6MTYzNjg3MzQ5NSwiZXhwIjoxNjM2ODc3MDk1fQ.sExo36GJOa3GCR3Umf9INA4C-hE6ZmIkvSk8k4EId5E"
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
    totArray.push(itemInc.result.incidents[i]);
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
console.log(itemRoute.result.trip.routes[0].points.coordinates.length);

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