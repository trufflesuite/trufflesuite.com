$(function() {
  $('.banner-close').click(function() {
    let bannerId = $(this).data('bannerId');
    $('#' + bannerId).animate({height: '0', padding: '0'});
  });
});