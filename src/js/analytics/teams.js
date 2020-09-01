// API Proxy
function mixpanelTrackProxy(eventName, eventParams) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.open('POST', 'http://localhost:3000/mixpanel/track');
  httpRequest.setRequestHeader("Content-Type", "application/json");
  
  httpRequest.onload = () => {
    // We don't expect a response here in the happy path, so
    // just check the reponse for errors originating in the server.
    if (httpRequest.status != 204) {
      console.error(`API Proxy Error ${httpRequest.status}: ${httpRequest.statusText}`);
    }
  };
  
  // Catching cases where the request failed completely.
  httpRequest.onerror = () => console.error('API Proxy Error: Request failed');
  
  httpRequest.send(JSON.stringify({
    "eventName": eventName,
    "eventParams": eventParams
  }));
}

/* Visitor Source
* --------------
* First checks for a known campaign via the source query string.
* Falls back to document.referrer.
*/
mixpanelTrackProxy("Page visit", {'source': getSource()});

// Navigation
Array.from(document.querySelectorAll('.subnav a')).forEach((link) => {
  link.onclick = (event) => {
    mixpanelTrackProxy("Navigate", {'section': event.srcElement.hash.substring(1)});
  }
});


// Signup Buttons
document.getElementById('teamsSignUp1').onclick = () => {
  mixpanelTrackProxy("Click teams signup", {'position': 1, 'plan': 'none'});
}

document.getElementById('teamsSignUp2').onclick = () => {
  mixpanelTrackProxy("Click teams signup", {'position': 2, 'plan': 'none'});
}

document.getElementById('teamsSignUp3').onclick = () => {
  mixpanelTrackProxy("Click teams signup", {'position': 3, 'plan': 'free'});
}

document.getElementById('teamsSignUp4').onclick = () => {
  mixpanelTrackProxy("Click teams signup", {'position': 4, 'plan': 'pro'});
}

document.getElementById('teamsSignUp5').onclick = () => {
  mixpanelTrackProxy("Click teams signup", {'position': 5, 'plan': 'none'});
}


// Other Buttons
document.getElementById('contactSales').onclick = () => {
  mixpanelTrackProxy("Click contact sales", {'plan': 'enterprise'});
}

document.getElementById('mailingListSignUp').onclick = () => {
  mixpanelTrackProxy("Click teams mailing list", {});
}


/* Utilies
 * -------
 * TODO: Extract once we have more than one MixPanel-enabled page.
 */
function getQueryParam(param) {
  param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

  const regexS = "[\\?&]" + param + "=([^&#]*)";
  const regex = new RegExp(regexS);
  let results = regex.exec(document.URL);
  
  if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
      return '';
  } else {
      return decodeURIComponent(results[1]).replace(/\+/g, ' ');
  }
};

function getSource() {
  const campaignSource = getQueryParam('source');

  if (campaignSource.length > 0) {
    return campaignSource;
  }

  return document.referrer;
};