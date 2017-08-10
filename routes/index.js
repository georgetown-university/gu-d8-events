const express = require('express');
const router = express.Router();

// Home page.
router.get('/', (req, res) => {
  res.render('index', {title: 'Home page', body: 'Content goes here'});
});

// Individual event details page.
router.get('/event/:eventid?', (req, res) => {
  const eventid = req.params.eventid;
  res.send(`
    <h1>${eventid}</h1>
    <p>About this event</p>
  `);
});

// 404 catch-all route.
router.get('*', (req, res) => {
  res.send(`
    <h1>Nope!</h1>
    <p>This page does not exist. Nothing to see here.</p>
  `);
});

module.exports = router;
