// Setup empty JS object to act as endpoint for all routes
var projectData = {};
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

//creating data using post method
app.post("/add", (req, res) => {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  res.send(projectData);
  console.log(req.body);
  console.log("data , temp , content ===> created");
});

app.get("/all", (req, res) => {
  res.send(projectData);
  console.log("getting all projectData");
});

// SERVER SETUP
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log(`server is running now on port ${PORT}`);
});
