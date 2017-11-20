

document.addEventListener("DOMContentLoaded", function() {
  var button = document.querySelectorAll('.btn-orange');
  var buttonImage = document.querySelectorAll('.btn-orange img');
  var buttonText = document.querySelectorAll('.btn-orange .os');

  var isWindows = window.navigator.userAgent.indexOf('Windows') != -1;
  var isMac = window.navigator.userAgent.indexOf('Mac') != -1;
  var isLinux = window.navigator.userAgent.indexOf('Linux') != -1;

  var href = "https://github.com/trufflesuite/ganache/releases";
  var os = "All Releases";
  var image = "";

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/repos/trufflesuite/ganache/releases/latest', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      
      if (isWindows) {
        image = '/images/suite/ganache/windows-logo.svg'
        os = "Windows"

        data.assets.forEach(function(asset) {
          if (asset.browser_download_url.indexOf(".appx") >= 0) {
            href = asset.browser_download_url;
          }
        })
      }
  
      if (isMac) {
        image = '/images/suite/ganache/apple-logo.svg';
        os = "MacOS";
        data.assets.forEach(function(asset) {
          if (asset.browser_download_url.indexOf(".dmg") >= 0) {
            href = asset.browser_download_url;
          }
        })
      }
  
      if (isLinux) {
        image = '/images/suite/ganache/linux-tux-logo.svg';
        os = "Linux";
        data.assets.forEach(function(asset) {
          if (asset.browser_download_url.indexOf(".AppImage") >= 0) {
            href = asset.browser_download_url;
          }
        })
      }

      for (i = 0; i < buttonImage.length; i++) {
        buttonImage[i].setAttribute('src', image);
        buttonText[i].innerHTML = '(' + os + ')';
        button[i].setAttribute('href', href);
      }

    } else {
      // We reached our target server, but it returned an error
      console.error("Error getting release list. Status: " + request.status);
      console.error(request.responseText);

      for (i = 0; i < buttonImage.length; i++) {
        buttonImage[i].setAttribute('src', image);
        buttonText[i].innerHTML = '(' + os + ')';
        button[i].setAttribute('href', href);
      }
    }
  };

  request.onerror = function(err) {
    // There was a connection error of some sort
    console.error("Error getting release list.");
    console.error(err);
  };

  request.send();
});
