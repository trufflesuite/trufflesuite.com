$(document).ready(function() {
  $(window).scroll(function() {
    const subnav = $('.subnav');
    const windowScrollPos = $(this).scrollTop();
  
    if (windowScrollPos > 300)
    {
      if (!subnav.hasClass('scroll'))
      {
        return subnav.addClass('scroll');
      }
  
      return;
    }
  
    return subnav.removeClass('scroll');
  });

  $('.subnav .scroll-link').click(function(event) {
    event.preventDefault();

    const target = $(this.hash);

    $('html, body').animate({
      scrollTop: target.offset().top - 120
    }, 1000);
  });
});