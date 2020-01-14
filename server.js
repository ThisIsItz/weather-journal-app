// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
 const port = 8000;
 const server = app.listen(port, listening);

  // Callback to debug
 function listening() {
     console.log(`server running on localhost: ${port}`);
 };

// Callback function to complete GET '/all'
app.get('/weatherData', function(req, res) {
    res.send(projectData);
})

// Post Route
app.post('/addWeather', function (req, res) {
    projectData = req.body;
    console.log('post request: received');
    console.log(projectData);
    res.send('Post received');
});
