var browserSync = require('metalsmith-browser-sync');
var app = require("./../metalsmith.js");
var path = require("path");

app(false).use(browserSync({
  server: {
    baseDir: path.join(__dirname, "../build"),
    serveStaticOptions: {
      extensions: ['html']
    }
  },
  files: [
    'helpers/**/*',
    'layouts/**/*',
    'partials/**/*',
    'src/**/*'
  ],
  port: 9000,
  open: false
}))
// We have to run build() here. browserSync hooks onto it.
.build(function(err) {
  if (err) throw err;
});