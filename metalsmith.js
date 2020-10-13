const Metalsmith = require('metalsmith');

// Plugins
const markdown = require('metalsmith-markdown');
const markdownPrecompiler = require('metalsmith-markdown-precompiler');
const sass = require('metalsmith-sass');
const layouts = require('metalsmith-layouts');
const discoverHelpers = require('metalsmith-discover-helpers');
const discoverPartials = require('metalsmith-discover-partials');
const Handlebars = require('handlebars');
const handlebarHelpers = require('handlebars-helpers');
const path = require('path');
const paths = require('metalsmith-paths');
const metadata = require('metalsmith-collections');
const json_to_files = require('metalsmith-json-to-files');
const moonSearch = require('./metalsmith-moonsearch/metalsmith-moonsearch.js');
const siteMap = require('metalsmith-sitemap');
const redirect = require('metalsmith-redirect');
const env = require('metalsmith-env');

// Data
const blogData = require('./src/blog/data.json');
const boxesData = require('./src/boxes/data.json');
const boxesMetadata = require('./src/data/boxes.json');
const careersData = require('./src/careers/data.json');
const docsData = require('./src/docs/data.json');
const eventsData = require('./src/events/data.json');
const pressReleasesData = require('./src/press-releases/data.json');
const staffData = require('./src/staff/data.json');
const tutorialsData = require('./src/tutorials/data.json');

function app(clean) {
  return Metalsmith(__dirname)
  .source(path.join('./', 'src'))
  .destination('build/')
  .clean(clean)
  .metadata({
    blog: blogData,
    boxes: boxesData,
    boxMeta: boxesMetadata,
    careers: careersData,
    docs: docsData,
    events: eventsData,
    pressReleases: pressReleasesData,
    staff: staffData,
    tutorials: tutorialsData,
    cssVersion: Date.now().toString(),
  })
  .use(env())
  .use(function (options) {
    handlebarHelpers({
      handlebars: Handlebars
    });
  })
  .use(discoverHelpers({
    directory: 'helpers',
    pattern: /\.js$/
  }))
  .use(discoverPartials({
    directory: 'partials',
    pattern: /\.hbs$/
  }))
  .use(json_to_files({
    source_path: './src/boxes/'
  }))
  .use(paths())
  .use(markdownPrecompiler({
    engine: "handlebars",
    pattern: /\.md$/,
    partialsPath: './../partials',
    partials: ["partial"]
  }))
  .use(markdown({
    renderer: require('./renderers/markdown.js')
  }))
  .use(layouts({
    "default": "blog-post-single.hbs",
    "pattern": ["blog/*.html"]
  }))
  .use(layouts({
    "default": "pr-single.hbs",
    "pattern": ["press-releases/*.html"]
  }))
  .use(layouts({
    "default": "career-single.hbs",
    "pattern": "careers/*.html"
  }))
  .use(layouts({
    "default": "tutorial-single.hbs",
    "pattern": "tutorials/*.html"
  }))
  .use(layouts())
  .use(sass({
    outputStyle: 'expanded',
    outputDir: 'css/'
  }))
  .use(moonSearch())
  .use(siteMap({
    hostname: "https://www.truffleframework.com"
  }))
  .use(redirect({
    redirections: {
      "/docs/truffle/getting-started/working-with-quorum": "/docs/truffle/distributed-ledger-support/working-with-quorum",
      "/docs/truffle/getting-started/working-with-hyperledger-evm": "/docs/truffle/distributed-ledger-support/working-with-hyperledger-evm",
    }
  }));
}

module.exports = app;
