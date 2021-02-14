// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance


// Initialize the main project folder
app.use(express.static('website')); 


// Setup Server
app.listen(3000, () => console.log('Server Up and running on local host 3000'));

// GET request
app.get('/get', (req, res) => {
    res.send(projectData)
    }
);

// POST request
app.post('/post', (req, res) => {
    projectData["temperature"] = req.body.temperature
    projectData["date"] = req.body.date
    projectData["userResponse"] = req.body.userResponse
    res.send(projectData)
    }
);