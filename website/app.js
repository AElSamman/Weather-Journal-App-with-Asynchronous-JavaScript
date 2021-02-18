/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// Added +1 to the getMonth() method because it starts from zero 
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// We are using the following URL format and parameters to access current weather data for any location on Earth
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// This is my personal API key which is an application programming interface key is a unique identifier used to authenticate a user, developer, or calling program to an API
const apiKey = '&appid=d5530d9fef2d5fbeb2f7cfae40f6d4f2';

//The generate click event Listening
document.getElementById('generate').addEventListener('click', (event) => {
    const zip = document.getElementById('zip').value; // acquiring the zip code entered by the client
    const feelings = document.getElementById('feelings').value; // acquiring the data entered by the client regarding the feeling question
    getTemperatureData(baseUrl, zip, apiKey) // calling the getData function and passing the URL parameters
        .then((temperatureData) => {
            postData('/postdata', { date: newDate, temp: temperatureData, userResponse: feelings });
            updateUserInterface();
        })
})

// GET Temperature Data
const getTemperatureData = async (baseUrl, zip, apiKey) => {
    const response = await fetch(baseUrl + zip + apiKey)
    try {
        const temperatureData = await response.json(); // resolves to a JavaScript object with the result of parsing the body text as JSON
        return temperatureData.main.temp; // obtain the exact temperature value 
    } catch (error) {
        console.error('Error:', error);
    }
}

// POST Data
const postData = async (url = '', projectData = {}) => {
    const response = await fetch(url, {
        method: 'POST', // The request method
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { // Content-Type header tells us what the content type of the returned content actually is
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData) // body data type must match "Content-Type" header
    })
    try {
        return projectData = await response.json(); // It returns a JavaScript object that resolves with the result of parsing the body text as JSON
    } catch (error) {
        console.error('Error:', error);
    }
}

// UPDATE the user inerface
const updateUserInterface = async () => {
    const response = await fetch('/getdata')
    try {
        const projectData = await response.json();
        document.getElementById('date').innerHTML = `Date: ${projectData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${projectData.temp}`;
        document.getElementById('content').innerHTML = `I'm feeling ${projectData.userResponse}`;
    } catch (error) {
        console.error('Error:', error);
    }
}