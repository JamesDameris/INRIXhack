
import fetch from "node-fetch";

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imp6eDV4NzFtYTQiLCJ0b2tlbiI6eyJpdiI6IjQzNDhiMDFhYTEzOGM0MGJhZTI2ZjU3MzBlOTY5YzlkIiwiY29udGVudCI6IjkxOTBkMjljZDc1NTQ1YzUxMTMyNTRhZmU3NzM2Zjg2ODU3YmJlMGMzYTlhNWQzYTI0NTBmZmM0Y2IwNGYyMDE4MmJkNmIyZDk2OTI5MTFlODZiNGE3NDc0MmM3MzI5NDQ2NzhjNDNmY2ZiOGY2YjNhMWYyOThmMGU3NWI2OWUzOWY0NDhhNjBjMTgyZTRjNzRlOWVlZWUzNzE5M2Y3NzI1ZGI1NzI4YWYyYzg1ZGM5YzYyMjViNzUzYTZlYWYwMDc3MGFhZWRkMmIxMDc0OGJjNzhhZmUwNTBiOWQwM2NlMGRlYWY4YmRhNWIzNmQ4NzYwZTc0MjJiYjIyYzFkOWM4MWNmNzVjMDU4ZDY5NmZmN2Q0NjQ3Y2U5Mjc4MDhmZGM0NDFkMmVmMDgxZGMyMzA3MGU4NzEwNGUzZGI5NjY3NTFhMjE5N2EyMTBkZDlmYmY0OGRhMjkyMmY1MmQzNzlhYWQxZmQwMDU5MGU1MTk5MGJkMTk1NGMyM2Y1ZDY0YTFhODg2YWI2MWQ0NzQ3Yjg0ZTNkNjZiMWFhOGNmNWJlNjMxMzc1YjJiYzBlNmVmMTMxOGRjNDc2YzlmMDNlNWE4ODM2ZDlkYzNmOTgwMTc0NTFhOTJlMzZhNGFiNjBjZmQyNWM4Zjg4YTVlNDlmMTNmZjdhMzY2MGNiYTU0ZmFkNTM1ZmNiNzczZmFhZjdlYzgzYzE1OTVjYTkxMjA1OWM5ODMzY2RmNjI5MjZlYjNjNTM0ZjUyZWQ0ODUyNWEyY2QxZDYxOGY5NzIxMjQ0ZDZhMGYxMGE4YzQ1NWYxMTU5MWRkYTZhMTNhNDM3NTcyMzc2MjhkNmZiMjhlYzMzYmMyOTVmZjhjMDk3YjQ2NzQzY2QifSwic2VjdXJpdHlUb2tlbiI6eyJpdiI6IjQzNDhiMDFhYTEzOGM0MGJhZTI2ZjU3MzBlOTY5YzlkIiwiY29udGVudCI6ImI3ZGJkMTlmZTc3NTQ5ZmYzNDZlNjdiZjgwNTg0MmQwZmEyMmMwM2EzNjlhMzk3NzZkNTJjZmExZDQyOGI2NzM4MmIwNDAyM2Q0ODVkMTNkODBhNmJhNzkifSwianRpIjoiMmYyNzczMjktN2RhZS00MjA4LTkwODctYjY4YWJkYjI0NzEyIiwiaWF0IjoxNjM2ODQ4NzY4LCJleHAiOjE2MzY4NTIzNjd9.SFDwcfoxPU-b03_RCaiHrmtkI4TW1EDA19xJ8dikpBg"
var urlincident = "https://api.iq.inrix.com/v1/incidents?box=37.810716%7C%20-122.457432%2C37.767597%7C-122.380071&incidentoutputfields=All&incidenttype=Flow,RoadWeather&locale=en"
var urlroute = "https://api.iq.inrix.com/findRoute?wp_1=37.790122%2C%20-122.424491&wp_2=37.791930%2C%20-122.424940&maxAlternates=2&format=json"
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
avoidance();
