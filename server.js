const express = require('express');
const app = express();
const routes = require('./routes/index');

app.set('view engine', 'ejs');

const server = app.listen(2000, () => {
  console.log('Listening on port 2000');
});

app.use('/', routes);
