module.exports = function(datasetName, pathName, propertyName, options) {
  if (propertyName in options.data.root[datasetName][pathName]) {
    return true;
  }

  return false;
};