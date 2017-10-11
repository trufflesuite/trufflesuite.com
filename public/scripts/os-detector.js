document.addEventListener("DOMContentLoaded", function() {
  var buttonImage = document.querySelectorAll('.btn-orange img');
  var buttonText = document.querySelectorAll('.btn-orange .os');

  for (i = 0; i < buttonImage.length; i++) {
    if (window.navigator.userAgent.indexOf('Windows') != -1) {
      buttonImage[i].setAttribute('src', '/images/suite/ganache/windows-logo.svg');
      buttonText[i].innerHTML = '(Windows)';
    }

    if (window.navigator.userAgent.indexOf('Mac') != -1) {
      buttonImage[i].setAttribute('src', '/images/suite/ganache/apple-logo.svg');
      buttonText[i].innerHTML = '(MacOS)';
    }

    if (window.navigator.userAgent.indexOf('Linux') != -1) {
      buttonImage[i].setAttribute('src', '/images/suite/ganache/linux-tux-logo.svg');
      buttonText[i].innerHTML = '(Linux)';
    }
  }
});
