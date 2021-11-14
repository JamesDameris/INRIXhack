import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImxwejljeTRsbjYiLCJ0b2tlbiI6eyJpdiI6ImE2NzEwNzcyN2FhZGU3OTM3NWNjMTIwZDIxYjg0NTFiIiwiY29udGVudCI6IjRmZjczZGJmZjVjMGY1ZmNkMGYwNWJmY2UyZDM5ZmU1ZThkZTUwMWI5NzY4ZWIwZmVkODRlNDU3MTJlNWNiZjBjODZlYjM1OWFmY2U4Mjk1YWJlOTBlMTZlZTgxYmJlNDE1YWU2YzZmMGYyYzZlMGUxNjMwNzgzOWQxYzIyNzQyNWNjMmY5YTFjNmM5ODEyMjRmM2NmMjA3MDkzOTU0ZmJlY2Y2MzZkOGRjNmM1ZGYxNDNiMGZmODNhZTUxMjBmNGU1YzMxZmNhOTU3MTc4OWQyNmU3NzdjYzg4OTc2ZGI0NzQxOGM4NTFlOWE4MDk2MjU2MzE4NmViMmExZDg2YzYyZDNiMDg0OGViOTEyNTYzYTM5NjUzNTVlMGZiYTRkN2M2NGIwYzUzZmZlNjAxNTdjZmFlMTdhMmQ3YTgxMjZmMDMxZjRlODNkMzI5MGI3OTY1ZWRjYjRhMDU3MmZmMWRhNzEzN2RhZDc5YjNmNGNjZDkwODk2YTdmNTY4ZWE2NGZhMTM5NjFlNTA3ZTkyMWYxMGZiZThjZDFlN2IwM2Y5OTA3N2YwZTA1ZmM4ODgzM2MyNzMzM2ZjYTNlOGE3Zjg0YjdhZTE3MzExMTA4ZmY5N2U1MDk1MWYzNjdlNTUzMDg4MDI4MzljZjI0YTJkZmI3NjJlZThjMWZhOWE2MTQxZjIzMjlhNDExYTAzZmM5MmRlZjE5MjI3YmQ2Yjc4OGIyNjlmY2FkM2U4MWU5MzUzYWU1YjkzYWM3NGQ1Zjg2ZjMyOGMyNjBlYjFjYTgyNmEyOGU3OWI1MjNhZGYyZWUzNDg2NzhjMGYzY2E1YTI2OWFjNTZiNThlYzk0YjY4ODhhNTcyMDgxYmNmMTA4ZDMxM2RiOWEzIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJhNjcxMDc3MjdhYWRlNzkzNzVjYzEyMGQyMWI4NDUxYiIsImNvbnRlbnQiOiIxOGMxM2NhNmYxZTBlMmFjYWNlMDc2ZjBjZGUxZTVlMGQwZmE2YzVmZTk1Y2Y0MTdmYThiYzUxMTBlZTFkNWU0Yzg0OWI1MGRmMGVmYmU4YjhiZTAxMzI4In0sImp0aSI6IjdkYzcyYjcyLTQ2MDMtNGIzMy1iODE0LTg2ODczODY1ZWMzYiIsImlhdCI6MTYzNjg1MzQ4MiwiZXhwIjoxNjM2ODU3MDgyfQ.41IWf7nYn-35__ITXbg6Y09_eL9RWVpIGEu9OB1mX8I"
var urlincident = "https://api.iq.inrix.com/v1/incidents?box=37.810716%7C%20-122.457432%2C37.767597%7C-122.380071&incidentoutputfields=All&incidenttype=Flow,RoadWeather&locale=en"
var urlroute = "https://na-api.inrix.com/Traffic/Inrix.ashx?Action=FindRoute&units=1&locale=en-US&wp_1=37.766223,-122.426577&wp_2=37.763183,-122.421556&maxAlternates=2&RouteOutputFields=B,M,P,S,W&RoutingType=Traffic&IsAmbiguousOrigin=true&format=json&token=NhOHgUOddmZtbQmBW844ylAJ7vGhPxw-hcssnMhOMW8|&UseTraffic=true&compress=true"
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
//console.log("road:", itemInc.result.incidents[0].parameterizedDescription.roadName);
//console.log("here: ", itemInc.result.incidents[0])
var incArray = []; //incident array
for (let i = 0; i < itemInc.result.incidents.length; ++i) {
    incArray.push(itemInc.result.incidents[i]);
}
//console.log(incArray[2].parameterizedDescription.roadName);
// console.log(itemRoute.result.trip.routes[0].summary);
// console.log(itemRoute.result.trip.routes[0].summary.roads.name);
function incident_on_route() {
    //all coordinates for incidents stored in incArray
    //go through all coordinate points in route and compare to incident coords
    // for(let i = 0; i < itemRoute.result.trip.routes.length; i++)
    // {
    //     for(let k = 0; k < itemRoute.result.trip.routes[i].points.coordinates.length; k++)
    //     {
    //         for(let j = 0; j < itemInc.result.incidents.length; j++)
    //         {
    //             if(itemRoute.result.trip.routes[i].points.coordinates[k] )
    //         }
    //     }
        
    // }
    //if coordinates are within certain range(will not be exact coords)
}

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
console.log(itemRoute.result.trip.routes[0].points.coordinates.length)
