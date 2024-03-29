document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelectorAll('.dl-ganache');
    var buttonImage = document.querySelectorAll('.dl-ganache img');
    var buttonText = document.querySelectorAll('.dl-ganache .os');
  
    var isWindows = window.navigator.userAgent.indexOf('Windows') != -1;
    var isMac = window.navigator.userAgent.indexOf('Mac') != -1;
    var isLinux = window.navigator.userAgent.indexOf('Linux') != -1;
  
    var supportsAppx = false; // Give Windows users the EXE by default
    if (isWindows) {
      var expr = /Windows NT ([0-9]+).([0-9]+)/g
      var match;
      if ("oscpu" in window.navigator) {
        match = expr.exec(window.navigator.oscpu);
      }
      else {
        match = expr.exec(window.navigator.userAgent)
      }
      if (match.length >= 3) {
        var majorVersion = parseInt(match[1]);
        var minorVersion = parseInt(match[2]);
        if (majorVersion > 6 || (majorVersion === 6 && minorVersion > 1)) {
          // if we're windows 8 (6.2) or higher (windows 10 is 10.0), then we support Appx files
          supportsAppx = true;
        }
      }
    }
  
    var href = "https://github.com/trufflesuite/ganache-ui/releases";
    var os = "All Releases";
    var image = "";
  
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/repos/trufflesuite/ganache-ui/releases/latest', true);
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        
        if (isWindows) {
          image = '/img/ganache/windows-logo.svg'
          os = "Windows"
  
          data.assets.forEach(function(asset) {
            if (supportsAppx) {
              if (/\.appx$/i.test(asset.browser_download_url)) {
                href = asset.browser_download_url;
              }
            }
            else {
              if (/\.exe$/i.test(asset.browser_download_url)) {
                href = asset.browser_download_url;
              }
            }
          })
        }
    
        if (isMac) {
          image = '/img/ganache/apple-logo.svg';
          os = "MacOS";
          data.assets.forEach(function(asset) {
            if (/\.dmg$/i.test(asset.browser_download_url)) {
              href = asset.browser_download_url;
            }
          })
        }
    
        if (isLinux) {
          image = '/img/ganache/linux-tux-logo.svg';
          os = "Linux";
          data.assets.forEach(function(asset) {
            if (/\.AppImage$/i.test(asset.browser_download_url)) {
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
  