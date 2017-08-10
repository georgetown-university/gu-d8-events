// Setting up the express app.
const express = require('express');
const app = express();
const routes = require('./routes/routes');

// Setting up the D8 JSON export
const request = require('request');
const eventsUrl = 'http://localhost:8888/eventsexportall'; // obv not prod-ready.

// Setting up the templating engine.
app.set('view engine', 'ejs');

// Starting the server.
const server = app.listen(2000, () => {
  console.log('Listening on port 2000');
});

// Getting all of the events data
request({
  url: eventsUrl,
  json: true
}, function (err, res, body) {

  // Exit if there is an error.
  if (err || res.statusCode !== 200) {
    console.error('An error has occurred.  Status code: ', res.statusCode);
    return false;
  }

  // Create an array of the events
  let events = [];
  body.forEach((item) => {
    events = events.concat(item);
  });

  app.locals.events = events;
})

// Calling the routes.
app.use('/', routes);
