$(document).ready(function() {

  $('#filter').submit(function(e) {
    e.preventDefault();

    const params = {
      daterange: $('input[name=daterange]:checked').val(),
      startdate: $('input[name=startdate]').val(),
      enddate: $('input[name=enddate]').val()
    };

    $.get('/filter', params, function(data) {
      $('#events').html(data);
    });
  });

});
