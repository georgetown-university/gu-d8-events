const request = require('request');
const eventsUrl = 'http://localhost:8888/events/'; // obv not prod-ready.

/* ---
 * Request all events data from the D8 JSON export
 */
var events = [];
request({
  url: eventsUrl,
  json: true
}, function (err, res, body) {

  // Exit if there is an error.
  if (err || res.statusCode !== 200) {
    console.error('An error has occurred.  Status code: ', res.statusCode);
    return false;
  }

  // Create an array of event data.
  body.forEach((item) => { events = events.concat(item); });
});


/* ---
 * Exported controller functions
 */
exports.getEvents = function(req, res) {
  return events;
}

exports.getEvent = function(req, res) {
  const eventid = req.params.eventid;
  let event = {};

  events.forEach((e) => {
    if (e.nid == eventid) {
      event = e;
    }
  });

  return event;
}
