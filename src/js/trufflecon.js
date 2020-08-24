$(document).ready(function() {

  // 2018 Buy Button

  $(window).scroll(function() {
    var buyButton = $('.trufflecon-nav, .trufflecon-nav-inline');
    var windowScrollPos = $(this).scrollTop();
  
    if (windowScrollPos > 300)
    {
      if (!buyButton.hasClass('scroll'))
      {
        return buyButton.addClass('scroll');
      }
  
      return;
    }
  
    return buyButton.removeClass('scroll');
  });

  // Hero Nav

  $('.trufflecon-nav .scroll-link, .trufflecon-nav-inline .scroll-link').click(function(event) {
    event.preventDefault();

    var target = $(this.hash);

    $('html, body').animate({
      scrollTop: target.offset().top - 120
    }, 1000);
  });
});
