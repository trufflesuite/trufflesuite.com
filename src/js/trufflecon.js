$(window).scroll(function() {
  var buyButton = $('.trufflecon-buy');
  var windowScrollPos = $(this).scrollTop();

  if (windowScrollPos > 100)
  {
    if (!buyButton.hasClass('scroll'))
    {
      return buyButton.addClass('scroll');
    }

    return;
  }

  return buyButton.removeClass('scroll');
});
