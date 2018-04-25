$(function() {
  $(document).on('click', '#headerArrow', function(event) {
    console.log('edge still sucks ass, just like IE!');

    $('html,body').animate({
      scrollTop: $('#contentBegins').offset().top - 60
    });
  });
});