// import express from our node modules
const express = require("express");

// import cors from our node modules
const cors = require("cors");

// run the config method of dotenv so we can have access to our enviroment variables
require("dotenv").config();

// tell the server what port to run on
const PORT = process.env.PORT || 8081;

// instanciating our instance of express into the app variable
const app = express();

// Cross-Origin Resource Sharing cors is the bridge that allow the client to access the server
// it is called a middle ware
// activate middleware
app.use(cors());

//import the json data
const data = require("./data.json");

function filterGamesByYear(theYear) {
  const result = data.filter((game) => game.year === theYear);
  return result;
}

function fitlerGamesByTitle(title) {
  const theGame = data.find((game) => game.title === title);
  return theGame;
}

app.get("/", (request, response) => {
  response.json("Hey you guys how are you saying!");
});

// app.get("/games", (request, response) => {
//   response.json(data);
// });

app.get("/games", (request, response) => {
  // console.log(request.query.year);
  // response.json("hello");
  let dataToReturn = data;

  if (request.query.title) {
    dataToReturn = fitlerGamesByTitle(request.query.title);
  } else if (request.query.year) {
    dataToReturn = filterGamesByYear(request.query.year);
  }

  response.json(dataToReturn);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
