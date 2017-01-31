var marked = require('marked');
var renderer = new marked.Renderer();

var current_z = 10000000000;

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  current_z -= 1;

  return '<h' + level + '>' +
    '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
    '<span class="header-link" style="z-index: ' + current_z + '">&nbsp;</span>' +
    '</a>' +
    text +
    '</h' + level + '>';
};

module.exports = renderer;
