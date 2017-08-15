const express = require('express');
const router = express.Router();

const siteTitle = 'GU Events';

/* ---
 * Declare all controllers
 */
const eventsController = require('../controllers/events');


/* ---
 * Home page
 */
router.get('/', (req, res) => {
  const events = eventsController.getEvents(req, res);
  res.render('index', {title: siteTitle, events: events});
});

/* ---
 * Individual event details page.
 */
router.get('/event/:eventid', (req, res) => {
  const event = eventsController.getEvent(req, res);
  const title = siteTitle + ': ' + event.title;
  res.render('event', {title: title, event: event});
});

/* ---
 * Host page.
 */
router.get('/host/:hostid', (req, res) => {
  var [events, host] = eventsController.getHostEvents(req, res);
  const title = siteTitle + ': Events by ' + host;
  res.render('host', {title: title, events: events});
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
