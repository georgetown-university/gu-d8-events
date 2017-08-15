const request = require('request');
const eventsUrl = 'http://localhost:8888/events/'; // obv not prod-ready.

/* ---
 * Helper functions to format dates.
 */
function formatDate(d) {
  if (!d) { return false; }

  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(d);
  return date.toLocaleString('en-us', dateOptions);
}


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
  body.forEach((item) => {
    item.formatted_date = formatDate(item.field_date);
    item.formatted_end_date = formatDate(item.field_end_date);
    events = events.concat(item);
  });
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

exports.getHostEvents = function(req, res) {
  const hostid = req.params.hostid;

  let filtered = [];
  events.forEach((e) => {
    if (e.field_host_id == hostid) {
      filtered = filtered.concat(e);
    }
  });

  const host = filtered[0].field_host;

  return [filtered, host];
}
