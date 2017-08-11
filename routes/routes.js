const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// Home page.
router.get('/', (req, res) => {
  const events = eventController.getEvents(req, res);
  res.render('index', {title: 'GU Events', events: events});
});

// Individual event details page.
router.get('/event/:eventid', (req, res) => {
  const event = eventController.getEvent(req, res);
  const title = 'GU Events: ' + event.title;
  res.render('event', {title: title, event: event});
});

// 404 catch-all route.
router.get('*', (req, res) => {
  res.send(`
    <h1>Nope!</h1>
    <p>This page does not exist. Nothing to see here.</p>
  `);
});

module.exports = router;
