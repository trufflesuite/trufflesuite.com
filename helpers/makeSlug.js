module.exports = function() {
  return arguments[0].toLowerCase().replace(/ /g, '-');
};