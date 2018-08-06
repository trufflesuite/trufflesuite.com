module.exports = function() {
  var msPath = arguments[0];

  if (msPath.dir === '' && msPath.name === 'index') {
    return 'https://trufflesuite.com'
  }

  var url = msPath.href;

  return 'https://trufflesuite.com' + url.substring(0, url.length - 5);
};