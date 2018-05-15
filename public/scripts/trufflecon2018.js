$(document).ready(function() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '/files/groovy-strum.mp3');
  
  audioElement.addEventListener('ended', function() {
    $('.MainContent').removeClass('groovy');
  }, false);
    
  $('#LetsGetGroovy').click(function() {
    audioElement.play();
    $('.MainContent').addClass('groovy');
  });
});