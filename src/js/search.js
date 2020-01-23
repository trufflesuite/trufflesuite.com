/*var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search'),
  resultsContainer: document.getElementById('searchResults'),
  json: '/docs/search.json'
});*/
jQuery(function($) {
  var docsMetadata = {
    "truffle": {
      "Getting Started": [
        "Installation",
        "Creating a Project",
        "Truffle Boxes",
        "Compiling Contracts",
        "Running Migrations",
        "Interacting with Your Contracts",
        "Package Management via ethPM",
        "Package Management via NPM",
        "Debugging Your Contracts",
        "Using Truffle Develop and The Console",
        "Writing External Scripts",
        "Using The Build Pipeline"
      ],
      "Testing": [
        "Testing Your Contracts",
        "Writing Tests in JavaScript",
        "Writing Tests in Solidity"
      ],
      "Advanced": [
        "Configuration",
        "Networks and App Deployment",
        "Build Processes",
        "Truffle with MetaMask"
      ],
      "Reference": [
        "Choosing an Ethereum Client",
        "Truffle Commands",
        "Contact The Developers"
      ]
    },
    "ganache": {
    },
    "drizzle": {
      "Getting Started": [
        "Using an Existing Redux Store",
        "Contract Interaction"
      ],
      "React": [
        "React Integration",
        "React Components"
      ],
      "Reference": [
        "Drizzle Options",
        "Drizzle State",
        "How Data Stays Fresh"
      ]
    }
  };

  var docsIndex = [];
  var z;

  var idx = lunr(function() {
    this.field('title', { boost: 10 });
    this.field('content');

    for (category in docsMetadata.truffle) {
      for (var i = 0; i < docsMetadata.truffle[category].length; i++) {
        var name = docsMetadata.truffle[category][i]
        
        var categorySlug = category.toLowerCase().replace(/ /g, '-');
        var titleSlug = name.toLowerCase().replace(/ /g, '-');
    
        var fileName = '/docs/truffle/' + categorySlug + '/' + titleSlug + '.html';
        var text = docsMetadata.truffle[category][i];
    
        $.ajax({
          url: fileName,
          type: 'get',
          success: (html) => {
            text = String(html);
            
            console.log(name);
            console.log(text);

            this.add({
              'title': name,
              'content': text
            });
          }
        });
      }
    }  
  });
  
  $('.container-heading button').click((event) => {
    event.preventDefault();
    var results = idx.search("migration"); // Get lunr to perform a search
    console.log(results);  
  });
});
