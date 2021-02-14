/* Global Variables */

const { request } = require("http");
const { getHeapCodeStatistics } = require("v8");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseUrl = 'api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=d5530d9fef2d5fbeb2f7cfae40f6d4f2';

//Event Listening
document.getElementById('generate').addEventListener('click', (event) => {
    console.log(event)
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getData(baseUrl.apiKey,zip).then( (data) => {
        console.log(data)
        post('/post', {date:d, temp:data.list[0].main.temp, userResponse: feelings})
        update();
    })
})

// GET DATA
const getData = async (baseUrl, apiKey, zip) => {
    const res = await fetch(baseUrl+zip+apiKey)
    try{
        const data = await res.json();
        return data
    } catch(err){
        console.log(err)
    }
}

//POST DATA
const post = async (url = '', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    try{
        const data = await res.json();
        console.log(data)
        return data;
    } catch(err){
        console.log(err)
    }
}

const update = async () => {
    const req = await fetch('/get');
    try{const data = await req.json();
    document.getElementById('date').innerHTML = `Date: ${data[0].date}`;
    document.getElementById('temp').innerHTML = `Date: ${data[0].temp}`;
    document.getElementById('content').innerHTML = `Date: ${data[0].content}`;
    }catch(err){
        console.log(err)
    }
}