$(document).ready(function() {
  $(window).scroll(function() {
    var buyButton = $('.trufflecon-nav');
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

  $('.trufflecon-nav .scroll-link').click(function(event) {
    event.preventDefault();

    var target = $(this.hash);

    $('html, body').animate({
      scrollTop: target.offset().top - 120
    }, 1000);
  });
});
