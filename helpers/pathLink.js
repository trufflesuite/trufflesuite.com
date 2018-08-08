module.exports = function() {
  potentialExtensionChunks = arguments[0].split('.');
  potentialExtensionChunks.pop();
  return potentialExtensionChunks.join('.');
};