$(function() {
  $(document).on('click', '#headerArrow', function(event) {
    $('html,body').animate({
      scrollTop: $('#contentBegins').offset().top - 60
    });
  });
});
