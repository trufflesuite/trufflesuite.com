$(function() {
  $('#headerArrow').click(function(event) {
    window.scroll({
      top: $('#contentBegins').offset().top - 60,
      left: 0, 
      behavior: 'smooth' 
    });
  });
});