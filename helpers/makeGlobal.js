module.exports = function(datasetName, options, window) {
  global.docsData = options.data.root[datasetName];
  return;
};