module.exports = function(repoName, options) {
  const boxTagList = options.data.root.boxMeta[repoName]['tags'];
  const boxTagString = boxTagList.join(', ');

  return boxTagString;
};