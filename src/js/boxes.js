const octokit = new Octokit();

octokit.authenticate({
  type: 'basic',
  username: 'discriskandbisque',
  password: 'baSbh4ts'
});

$(window).on('load', function() {
  // Get Tags
  var boxCards = $('.box-card');

  boxCards.each(function() {
    var boxUserOrgName = $(this).data('userorg');
    var boxRepoName = $(this).data('repo');

    fetchStarsAndTags(boxUserOrgName, boxRepoName, this);
  });


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

  $('#isoSort').on('change', function(event) {
    var filterGroup = $(event.currentTarget).attr('data-filter-group');
    var filterValue = $(event.currentTarget).find(':checked').attr('data-filter');

    console.log(filterGroup + ' ' + filterValue);

    filterValue = filterFns[filterValue] || filterValue;

    filters[filterGroup] = filterValue;

    $container.isotope('arrange');
  });

  // Use value of search field to filter.
  var $quicksearch = $('#boxesSearch').keyup(debounce( function() {
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

// Functions

function fetchStarsAndTags(boxUserOrgName, boxRepoName, cardElement) {
  // General Info
  octokit.repos.get({owner: boxUserOrgName, repo: boxRepoName})
  .then(function(result) {
    console.log(result)
    
    // Stars
    $(cardElement).find('.box-star-count').html('<i class="fas fa-star text-warning"></i> ' + result.data.stargazers_count);

    // Stars
    $(cardElement).find('.box-description').html(result.data.description);
  })
  .catch(function(error) {
    console.error(error);
  });

  // Tags
  octokit.repos.getTopics({owner: boxUserOrgName, repo: boxRepoName})
  .then(function(result) {
    const ghTags = result.data.names.join(', ');
    const currentTags = $(cardElement).find('.box-tags').text();
    
    var newTags = result.data.names.length > 0 ? currentTags + ', ' + ghTags : currentTags;

    $(cardElement).find('.box-tags').text(newTags);

    $('#isoContainer').isotope('arrange');
  })
  .catch(function(error) {
    console.error(error);
  });
}