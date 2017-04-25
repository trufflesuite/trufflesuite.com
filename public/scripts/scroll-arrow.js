$(function() {

  var scrollArrow = $('#scrollDown');

  scrollArrow.click(function() {
    var navbarHeight = $('.navbar').outerHeight();

    $('html, body').animate({
      scrollTop: $('.BetaSignup').offset().top - navbarHeight
    }, 800);
  });
});
