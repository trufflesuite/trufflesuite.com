module.exports = function() {
  var msPath = arguments[0];
  var thisCategory = arguments[1];

  var currentCategory = msPath.href.replace(/http(s)?:\/\//, '').split('/')[2];

  return thisCategory === currentCategory ? 'show' : '';
};