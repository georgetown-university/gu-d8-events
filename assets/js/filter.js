var filter = {
  init: function() {
    $('#filter').submit((e) => {
      e.preventDefault();
      this.getQuery();
      this.validate();
      this.getResults();
    });

    $('input[name=daterange]').change(() => {
      if ($('input[name=daterange]:checked').val() == 'all') {
        $('.dates').hide();
        this.resetDates();
      } else {
        $('.dates').show();
      }
    });
  },

  /* ---
   * Save form query parameters.
   */
  getQuery: function() {
    this.startdate = $('input[name=startdate]').val();
    this.enddate = $('input[name=enddate]').val();
    this.daterange = $('input[name=daterange]:checked').val();
  },

  /* ---
   * Validate the form and update values as needed.
   */
  validate: function() {
    // If both dates are blank, set the filter to "All".
    if (!this.startdate && !this.enddate) {
      $('input[name=daterange][value=all]').prop('checked', 'checked');
      this.daterange = 'all';
    }

    // If all dates are selected, reset the date fields.
    if (this.daterange == 'all') {
      this.resetDates();
    }
  },

  /* ---
   * Helper function to reset start and end date fields to null values.
   */
  resetDates: function() {
    $('input[name=startdate]').val('');
    $('input[name=enddate]').val('');

    this.startdate = '';
    this.enddate = '';
  },

  /* ---
   * Get filtered results.
   */
  getResults: function() {
   // Set up the GET parameters.
   const params = {
     daterange: this.daterange,
     startdate: this.startdate,
     enddate: this.enddate
   };

   $.get('/filter', params, function(data) {
     $('#events').html(data);
   });
  }
};


$(document).ready(function() {
  filter.init();
});
