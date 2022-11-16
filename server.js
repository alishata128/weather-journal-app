// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require("express");

const bodyParser = require("body-parser");

// Start up an instance of app

const appInstance = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
appInstance.use(bodyParser.urlencoded({ extended: false }));
appInstance.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
appInstance.use(cors());

// Initialize the main project folder
appInstance.use(express.static("website"));

const data = [];
appInstance.post("/add", addData);

function addData(req, res) {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  res.send(projectData);
}

appInstance.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
}

// Setup Server

const PORT = 3000;
const server = appInstance.listen(PORT, listener);

function listener() {
  console.log(`server is running now on port ${PORT}`);
}
