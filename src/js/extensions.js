$(window).on('load', function() {
  // Initialization
  var buttonFilter;
  var qsRegex;
  var $container = $('#isoContainer');

  $container.isotope({
    itemSelector: '.iso-item',
    layoutMode: 'masonry',
    filter: function() {
      var $this = $(this);
      var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
      var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
      return searchResult && buttonResult;
    }
  });

  const selectedProduct = getQueryParam('product');

  if (selectedProduct.length > 0) {
    $('input[data-filter=".' + selectedProduct + '"]').prop('checked', true);
    buttonFilter = '.' + selectedProduct;
    $container.isotope('arrange');
  }

  // Filters & Search
  $('#filterExtensions input').on('change', function(event) {
    const filterProduct = $(event.currentTarget).attr('data-filter');

    buttonFilter = filterProduct;

    $container.isotope('arrange');
  });

  $('#filterClear').on('click', function() {
    $('input[name="product"]').prop('checked', false);
    $('#extensionsSearch').val('');
    buttonFilter = '';
    qsRegex = '';
    $container.isotope('arrange');
  });

  // Use value of search field to filter.
  var $quicksearch = $('#extensionsSearch').on('keyup', debounce( function() {
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

function getQueryParam(param) {
  param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

  const regexS = "[\\?&]" + param + "=([^&#]*)";
  const regex = new RegExp(regexS);
  let results = regex.exec(document.URL);
  
  if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
      return '';
  } else {
      return decodeURIComponent(results[1]).replace(/\+/g, ' ');
  }
};
