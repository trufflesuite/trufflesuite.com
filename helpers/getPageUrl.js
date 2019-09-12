var path = require("path");

module.exports = function() {
  var msPath = arguments[0];

  if (msPath.dir === '' && msPath.name === 'index') {
    return 'https://trufflesuite.com'
  }

  var url = msPath.href;
  return 'https://trufflesuite.com' + url.substring(0, url.length - path.extname(url).length);
};
