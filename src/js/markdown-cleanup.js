$(function() {
  // Cleans up empty paragraphs sometimes produced by markdown.
  $('p').each(function() {
    if (!$(this).text()) {
      $(this).remove();
    }
  });
});