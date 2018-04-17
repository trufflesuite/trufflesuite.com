var marked = require('marked');
var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
    <h${level}>
      <a class="link-markdown" href="#${escapedText}" name="${escapedText}">
        <i class="fas fa-link"></i> ${text}
      </a>
    </h${level}>
  `;
};

renderer.image = function(href, title, text) {
  return `
    <img class="img-fluid" src="${href}" title="${text}" alt="${text}" />
    ${title ? `<p class="img-caption">${title}</p>` : ""}
  `;
};

module.exports = renderer;
