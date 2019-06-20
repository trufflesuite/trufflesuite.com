var app = require("./../metalsmith.js");

app(true).build(function(err) {      // build process
  if (err) throw err;       // error handling is required
});
