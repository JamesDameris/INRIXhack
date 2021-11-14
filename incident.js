import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imp6eDV4NzFtYTQiLCJ0b2tlbiI6eyJpdiI6IjU2NWMxZWNkOTRjMGVhNGQwNDgwYTBmYjI5ZWFkYjg5IiwiY29udGVudCI6ImFmYWIyOTExNzM2N2IyYzI1ZjZhOTY3NzUxMGI5ZTIxZDM4OTJkMzhkZDE0MjZjYzI0YmJiZWFmYmRjZmQ4Njk4MDhhYWFjNzZmNTg3Y2MyZjFjNDlkNTZjOGYyN2IwYzk4MTgxZmUzNDA0MDI1ODhhYzY3YjhhYTU2ODIxY2QwODA5YWI2ZjBjMTFiN2ZlODkwOGVkNzNhMWEwYjc5MzgxMTViOThkYzg0NjNjMWU3YTRiMGNhZDY2MDI5NDgxYWIyZjcxMTVjZDIwYTA4MTc0YjVjZGRmOWM3NzQyMDg0YTZkMDkyNTIzYWY3MmZlZTBiNTk0ODUwODBhZmFhZjZmZTk2ZjdlZGI2YTI0YjUxYmUxNDgwMzA4YzE3N2U5NmRmMWJiNGY5OGNlM2RiMDg1NmQ2N2RhZTYyZTc4ZmFlYjRlYWQ3NGVmNmFlNTljNGY3MWQyNDJhZjZmOWJiOTMxOWJlOWVlZWU4YzUxMjA3N2JjYzU0ODllMjIyNTE5MzQ3YjM4MTRmNWM0MTc4NTc4NWVlNmE3YmM5YTY1ODM5YWQ2OTRkM2ExNGU0ZTJmZTA2YTFlMWMwZDE3MGZjNjFhYWUyNmZkY2I4ZjYzNzllOWVkMjU5YmZiNGRlN2E5YzNiNjA0NTIxZGMyYzBmNzM3NTA3ZDdlZGFlYmEzMjEzNzc4ODUyYjJlZDRkZDc4MTQwN2MwZmJkYTJlNGQ1MWQyZDkxYzgwODJkYmMyM2VmMTE5NDc0ZWJiMDQxZmU0OTFkMWFkM2NlNGFkNjExNjJkMjM0MjgwNzQ0OTI5ZTk2ZWNjMWNmNzFmODVjYWUxMTRjNWJlZmVhMGIyOGJhNTRmNGI2MTc3MmEyOTJlM2ZlYTY2MTdjIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI1NjVjMWVjZDk0YzBlYTRkMDQ4MGEwZmIyOWVhZGI4OSIsImNvbnRlbnQiOiI4MDhhMmUzZDQ1NzdlOTgxNTg3MGVmN2E2YjNhYjQyOWVjYTYzNzNlYTQwOTBlYTEzMjhmOWFjOTg1YzZjZTA5ZWY5ZGExZDQyYTc3NmFmY2UwY2JhMjY4In0sImp0aSI6IjBkZjgxZTAzLTY2OWYtNDdkNi1iM2E3LWJjMGJhYjE0Njc1MSIsImlhdCI6MTYzNjg2NDAzNiwiZXhwIjoxNjM2ODY3NjM2fQ.obcZdKnDqlvv6FDNpLIVJNCzWWh-Q8kI_K9NnIm8E6s"
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
//console.log(incArray[2].parameterizedDescription.roadName);
//console.log(itemRoute.result.trip.routes[0].points.coordinates);
// console.log(itemRoute.result.trip.routes[0].summary.roads.name);
function incident_on_route() {
    var incCounter = [itemRoute.result.trip.routes.length];
    for (let init = 0; init < itemRoute.result.trip.routes.length; ++init) {
        incCounter[init] = 0;
    }
   // all coordinates for incidents stored in incArray
   // go through all coordinate points in route and compare to incident coords
    for(let i = 0; i < itemRoute.result.trip.routes.length; ++i) // iterate through the routes
    {
        for(let j = 0; j < itemInc.result.incidents.length; ++j) 
        {    
            for(let k = 0; k < itemRoute.result.trip.routes[i].points.coordinates.length; ++k)
            { 
                console.log("Difference: ", Math.abs(incArray[j].geometry.coordinates[0]-itemRoute.result.trip.routes[i].points.coordinates[k][0]));
                // Comparing the Coordinates of the Incident and the points on the route
                if((Math.abs(itemRoute.result.trip.routes[i].points.coordinates[k][1] - incArray[j].geometry.coordinates[1])) <= 0.001 
                && Math.abs(incArray[j].geometry.coordinates[0]-itemRoute.result.trip.routes[i].points.coordinates[k][0]) <= 0.001
                ){
                    
                    incCounter[i]+= incArray[j].severity;
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
console.log(itemRoute.result.trip.routes[0].points.coordinates.length);
//console.log(itemInc.result.incidents)