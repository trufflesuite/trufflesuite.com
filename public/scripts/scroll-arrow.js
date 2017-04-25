$(function() {

  var scrollArrow = $('#scrollDown');

  // Click to Scroll

  scrollArrow.click(function() {
    var navbarHeight = $('.navbar').outerHeight();

    $('html, body').animate({
      scrollTop: $('.BetaSignup').offset().top - navbarHeight
    }, 800);
  });

  // Scrolling Opacity

  $(window).scroll(function() {
    var windowScrollPos = $(this).scrollTop();

    if (windowScrollPos > 0)
    {
      if (!scrollArrow.hasClass('scroll'))
      {
        return scrollArrow.addClass('scroll');
      }

      return;
    }

    return scrollArrow.removeClass('scroll');
  });
});
