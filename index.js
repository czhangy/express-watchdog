// Get dependencies
const express = require("express");
const fetch = require("node-fetch");

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;
// const INTERVAL = (1000 * 60 * 60 * 24);
const INTERVAL = 5000;

// Middleware stack: GET request --> POST request
app.use(initiateRequests);
app.get("/", (req, res) => {
  console.log("Done!");
  res.send("<h1>Home Page</h1>");
});

// Perform GET request
function getRequest() {
  fetch("https://google.com")
    .then(checkResponseStatus)
    .then((rep) => rep.text())
    .then((text) => console.log(text))
    .catch(err => console.log(err));
}

// Perform POST request
function postRequest() {
  let garbage = {
    data: "123"
  };

  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(garbage),
    headers: { "Content-Type": "application/json" },
  })
    .then(checkResponseStatus)
    .then((rep) => rep.json())
    .then((json) => console.log(json))
    .catch(err => console.log(err));
}

// Function to schedule requests once a day
function initiateRequests(req, res, next) {
  setInterval(getRequest, INTERVAL);
  setInterval(postRequest, INTERVAL);
  next();
}

// Function for exception handling
function checkResponseStatus(res) {
  if (res.ok) return res;
  else
    throw new Error(
      `The HTTP status of the reponse: ${res.status} (${res.statusText})`
    );
}

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));