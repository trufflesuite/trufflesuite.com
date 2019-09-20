module.exports = function() {
  let text = arguments[0];
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return text;
};