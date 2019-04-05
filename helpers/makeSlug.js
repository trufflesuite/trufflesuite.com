module.exports = function() {
  return arguments[0].toLowerCase().replace("'", '').replace(/[^\w\s]/g, ' ').replace(/ /g, '-');
};