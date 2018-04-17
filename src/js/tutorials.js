$(window).on('load', function() {
  // Initialization
  var qsRegex;
  var $container = $('#isoContainer');

  $container.isotope({
    itemSelector: '.iso-item',
    layoutMode: 'masonry',
    filter: function() {
      var isMatched = true;
      var $this = $(this);

      var searchField = qsRegex ? $this.text().match(qsRegex) : true;

      for (var prop in filters) {
        var filter = filters[prop];
        // Use function if it matches.
        filter = filterFns[filter] || filter;
        // Test each filter.
        if (filter) {
          isMatched = isMatched && $this.hasClass(filter);
        }
        // Break if not matched.
        if (!isMatched) {
          break;
        }
      }
      return isMatched && searchField;
    }
  });

  // Filters & Search
  var filterFns = {};
  var filters = {};

  $('#isoSort').on('change', 'select', function(event) {
    var filterGroup = $(event.currentTarget).attr('data-filter-group');
    var filterValue = $(event.currentTarget).find(':selected').attr('data-filter');

    filterValue = filterFns[filterValue] || filterValue;

    filters[filterGroup] = filterValue;

    $container.isotope('arrange');
  });

  // Use value of search field to filter.
  var $quicksearch = $('#tutorialsSearch').keyup(debounce( function() {
    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
    $container.isotope('arrange');
  }, 200));

  // Debounce so filtering doesn't happen every millisecond.
  function debounce(fn, threshold) {
    var timeout;

    return function debounced() {
      if ( timeout ) {
        clearTimeout( timeout );
      }

      function delayed() {
        fn();
        timeout = null;
      }

      timeout = setTimeout( delayed, threshold || 100 );
    }
  }
});