module.exports = function(datasetName, pathName, propertyName, options) {
  return options.data.root[datasetName][pathName][propertyName];
};