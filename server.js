// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require Express to run server and routes
const bodyParser = require('body-parser');

// Require Express to run server and routes
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as a middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); 

// Setup Server
app.listen(3000, () => console.log('Server Up and running on local host 3000'));

// GET request
app.get('/getdata', (req, res) => {
    res.send(projectData)
    }
);

// POST request
app.post('/postdata', (req, res) => {
    projectData["date"] = req.body.date
    projectData["temp"] = req.body.temp
    projectData["userResponse"] = req.body.userResponse
    res.send(projectData)
    }
);