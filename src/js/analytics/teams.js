/* Visitor Source
 * --------------
 * First checks for a known campaign via the source query string.
 * Falls back to document.referrer.
 */ 
mixpanel.track("Page visit", {'source': getSource()});


// Navigation
Array.from(document.querySelectorAll('.subnav a')).forEach((link) => {
  link.onclick = (event) => {
    mixpanel.track("Navigate", {'section': event.srcElement.hash.substring(1)});
  }
});


// Signup Buttons
document.getElementById('teamsSignUp1').onclick = () => {
  mixpanel.track("Click teams signup", {'position': 1, 'plan': 'none'});
}

document.getElementById('teamsSignUp2').onclick = () => {
  mixpanel.track("Click teams signup", {'position': 2, 'plan': 'none'});
}

document.getElementById('teamsSignUp3').onclick = () => {
  mixpanel.track("Click teams signup", {'position': 2, 'plan': 'free'});
}

document.getElementById('teamsSignUp4').onclick = () => {
  mixpanel.track("Click teams signup", {'position': 2, 'plan': 'pro'});
}

document.getElementById('teamsSignUp5').onclick = () => {
  mixpanel.track("Click teams signup", {'position': 2, 'plan': 'none'});
}


// Other Buttons
document.getElementById('contactSales').onclick = () => {
  mixpanel.track("Click contact sales", {'plan': 'enterprise'});
}

document.getElementById('mailingListSignUp').onclick = () => {
  mixpanel.track("Click teams mailing list", {});
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
}