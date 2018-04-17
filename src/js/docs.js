$(function() {  
  var parsedUrl = new URL(window.location.href);

  // Are we on the docs home page?
  if (parsedUrl.pathname.length > 2) {
    var category = parsedUrl.pathname.split('/')[2];

    $('#' + category + 'Docs').collapse('show');
  }
});