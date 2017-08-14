const express = require('express');
const router = express.Router();

/* ---
 * Declare all controllers
 */
const eventsController = require('../controllers/events');


/* ---
 * Home page
 */
router.get('/', (req, res) => {
  const events = eventsController.getEvents(req, res);
  res.render('index', {title: 'GU Events', events: events});
});

/* ---
 * Individual event details page.
 */
router.get('/event/:eventid', (req, res) => {
  const event = eventsController.getEvent(req, res);
  const title = 'GU Events: ' + event.title;
  res.render('event', {title: title, event: event});
});

/* ---
 * 404 catch-all route.
 */
router.get('*', (req, res) => {
  res.send(`
    <h1>Nope!</h1>
    <p>This page does not exist. Nothing to see here.</p>
  `);
});


module.exports = router;
