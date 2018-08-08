var app = require("./metalsmith.js")

app.build(function(err) {      // build process
  if (err) throw err;       // error handling is required
});
