$(function() {

  var navbar = $('.navbar');

  // Landing Page Scrolling Opacity

  $(window).scroll(function() {
    var windowScrollPos = $(this).scrollTop();

    if (windowScrollPos > 0)
    {
      if (!navbar.hasClass('scroll'))
      {
        return navbar.addClass('scroll');
      }

      return;
    }

    return navbar.removeClass('scroll');
  });

  // Opacity with Menu Open for Mobile

  var navMenu = $('#navbar');
  var navbarToggle = $('.navbar-toggle');

  navMenu.on('show.bs.collapse', function() {
    navbarToggle.addClass('close');
    return navbar.addClass('nav-shown');
  });

  navMenu.on('hide.bs.collapse', function() {
    navbarToggle.removeClass('close');
    return navbar.removeClass('nav-shown');
  });
});
