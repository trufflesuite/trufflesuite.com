$(function() {
  $('#docsSidebarToggle').click(function(event) {
    if ($('#docsSidebar').css('position') === 'absolute') {
      $('#docsSidebar').toggleClass('open');
    }
  });
});