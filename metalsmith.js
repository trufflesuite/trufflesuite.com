var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var sass        = require('metalsmith-sass');
var ejs         = require('ejs');

var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var globals = require("./globals.json");

var source = path.join(__dirname, "public");

var app = Metalsmith(__dirname)
  .source(path.join("./", "public"))
  .destination('build/')
  .clean(false)
  .use(sass({
    outputStyle: "expanded"
  }))
  .use(markdown({
    renderer: require("./renderers/markdown.js")
  }))
  .use(function(files, metalsmith, done) {

    // We get odd paths from metalsmith, with mixed folder separators.
    // Let's massage them into one.
    Object.keys(files).forEach(function(file_path) {
      var new_file_path = file_path.replace(/(\\|\/)/g, path.sep);

      if (new_file_path != file_path) {
        files[new_file_path] = files[file_path];
        delete files[file_path];
      }
    });

    var prefills = {
      public: {}
    };

    // Get all prefills
    Object.keys(files).filter(function(file_path) {
      return path.basename(file_path) == "_data.json";
    }).forEach(function(file_path) {
      var pieces = file_path.replace(".json", "").split(path.sep);

      var context = prefills.public;

      pieces.forEach(function(piece, index) {
        if (context[piece] == null) {
          context[piece] = {};
        }

        if (index == pieces.length - 1) {
          context[piece] = require(path.join(source, file_path));
        } else {
          context = context[piece];
        }
      });

      // Remove the _data.json file because it's not longer needed.
      delete files[file_path];
    });

    Object.keys(globals).forEach(function(key) {
      prefills[key] = globals[key];
    });

    // Gather all templates
    var layouts = {};

    Object.keys(files).filter(function(file_path) {
      return path.basename(file_path) == "_layout.ejs";
    }).forEach(function(file_path) {
      var full_path = path.join(source, file_path);
      var contents = files[file_path].contents.toString();

      layouts[file_path] = ejs.compile(contents, {
        filename: full_path
      });

      // Remvoe the _layout.ejs files because we no longer need them
      delete files[file_path];
    });

    function renderFile(file_path, yield_data, caller) {
      if (caller == null) {
        caller = file_path;
      }

      var current = caller.replace(path.extname(caller), "").split(path.sep);

      var data = _.clone(prefills);
      data.yield = yield_data;
      data.current = {
        path: current,
        source: current.length > 0 ? current[current.length - 1] : ""
      };
      data._ = _;

      data.partial = function(partial_path) {
        partial_path = path.join(path.dirname(file_path), partial_path);

        // Note that middleware above may change the extension, so lets
        // guess at it if it's not specified.
        var possibles = [path.extname(partial_path), ".md", ".html", ".ejs"];

        for (var i = 0; i < possibles.length; i++) {
          var extension = possibles[i];
          if (extension == "") continue;
          var guessed_path = partial_path + extension;

          if (files[guessed_path] != null) {
            partial_path = guessed_path;
            break;
          }
        }

        return renderFile(partial_path, "", caller);
      };

      var template;

      if (typeof file_path == "function") {
        template = file_path;
      } else {
        // TODO: Can we remove this template read?
        var full_path = path.join(source, file_path);

        var contents = files[file_path].contents.toString();
        template = ejs.compile(contents, {
          filename: full_path
        });
      }

      return template(data);
    };

    // Gather all files to be rendered via layoutable
    Object.keys(files).filter(function(file_path) {
      return file_path.indexOf("_includes") != 0;
    }).filter(function(file_path) {
      var extname = path.extname(file_path);
      return extname == ".ejs" || extname == ".html";
    }).forEach(function(file_path) {
      if (path.extname(file_path) == ".ejs") {
        files[file_path].contents = new Buffer(renderFile(file_path));
      }

      // Now go through items applying templates.
      // Don't template any double extensions (i.e., humans.txt.ejs);
      var second_extension = path.extname(file_path.replace(path.extname(file_path), ""));
      var is_templatable = second_extension == "";

      if (is_templatable) {
        // Pop off items off the path looking for applicable _layout.ejs files.
        // If they exist, then apply the template.
        var context = file_path;

        while (context != ".") {
          context = path.dirname(context);

          var expected_template = layouts[path.join(context, "_layout.ejs")];

          if (expected_template != null) {
            var content = renderFile(expected_template, files[file_path].contents.toString(), file_path);
            files[file_path].contents = new Buffer(content);
          }
        }
      }

      // Delete the old file objects we don't need and replace them with the new ones.
      var new_extention = is_templatable ? ".html" : second_extension;
      var new_path = file_path.replace(path.extname(file_path), "");

      if (new_path.indexOf(new_extention) < 0) {
        new_path += new_extention;
      }

      var item = files[file_path];
      delete files[file_path];
      files[new_path] = item;
    });

    Object.keys(files).filter(function(file_path) {
      return file_path.indexOf("_includes") == 0;
    }).forEach(function(file_path) {
      delete files[file_path];
    });

    done();
  });

module.exports = app;
