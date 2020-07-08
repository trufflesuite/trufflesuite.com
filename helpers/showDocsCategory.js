module.exports = function(msPath, thisCategory) {
  // Because of two separate document URL structures (/docs/<category>/... and /docs/<blockchain>/<category>/...)
  // we can't determine the category simply by its position in the URL.
  // This means we have to accept less ideal matching (e.g., existing of the category anywhere)
  // but this add more problems. Take this docs path, for instance:
  // 
  //     /docs/ganache/truffle-projects/linking-a-truffle-project
  // 
  // Simple existence matching would detect both "ganache" and "truffle", which would 
  // expand both docs categories, which we don't want. So instead, we need to
  // find the *first instance* of all available categories, and only expand the sidebar 
  // item if it matches the category we're looking for.  
  var availableCategories = ["truffle", "ganache", "drizzle", "teams"]

  var categoryIndexes = availableCategories.map(function(val) {
    return msPath.dhref.indexOf(val);
  });

  var earliestCategoryArrayIndex = null;
  var earliestCategoryStringPosition = Number.MAX_SAFE_INTEGER;

  categoryIndexes.forEach(function(stringPosition, index) {
    if (stringPosition >= 0 && stringPosition < earliestCategoryStringPosition) {
      earliestCategoryArrayIndex = index;
      earliestCategoryStringPosition = stringPosition;
    } 
  });

  var currentCategory = availableCategories[earliestCategoryArrayIndex];

  return thisCategory === currentCategory ? 'show' : '';
};