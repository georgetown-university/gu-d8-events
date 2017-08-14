// Setting up the express app.
const express = require('express');
const app = express();
const routes = require('./routes/routes');

// Setting up the templating engine.
app.set('view engine', 'twig');

// Declaring the assets directory.
app.use(express.static(__dirname + '/assets'));

// Starting the server.
const server = app.listen(2000, () => {
  console.log('Listening on port 2000');
});

// Calling the routes.
app.use('/', routes);
