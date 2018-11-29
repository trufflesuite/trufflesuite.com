# Truffle Suite Website - https://www.truffleframework.com

Our website is built with [Metalsmith](http://www.metalsmith.io/), using Handlebars templates and a combination of HTML and markdown for page content. 

Since Metalsmith allows for a highly customized setup, you'll probably want to at least skim this guide to get a lay of the land.

## Contributing

We welcome all contributions, typo corrections, and general feedback.

We place handy "See a way to make this page better?" links wherever we can to provide a GitHub link to the relevant file.

## Contents

* [Build Process & Directory Structure](#build-process-directory-structure)
* [Layouts](#layouts)
* [Partials](#partials)
* [Helpers](#helpers)
* [Styles](#styles)
* [Static Files](#static-files)
* [Search](#search)

## Build Process & Directory Structure

You can find the HTML and markdown source files inside the `src/` directory.

Files in the `src/` directory move through the build pipline defined in `metalsmith.js` via a series of middleware-like plugins. Each plugin receives the files in a processed state from the previous one. For example, after using the markdown plugin subsequent plugins will only see the rendered HTML files.

## Layouts, Partials and Helpers

The site uses [Handlebars](https://handlebarsjs.com/) templates. The page layouts, partials and helper functions can be found in their respective directories: `layouts/`, `partials/`, and `helpers/`.

### Layouts

*Layouts* are used to define the fonts, scripts and stylesheets unique to a particular page or set of pages, e.g. blog posts or truffle box detail pages. Layouts for items in a collection are prefaced with `single-`, for example: `single-tutorial.hbs`.

All layouts have a special `{{{ contents }}}` variable which renders the page content. The title and desired layout are specified in a yaml block at the top of the document. For example:

```
---
title: Page Title
layout: layout.hbs
---
```

Single blog posts, tutorials, and careers are part of collections that do not need to specify a title or layout; they are provided by the collection.

### Partials

Partials are snippets of HTML used repeatedly throughout the site, such as the navigation bar, or to encapsulate parts of a page, such as the interactive header image on the home screen (`partials/home/suite-header.hbs`).

Partials can also contain child content and take arguments, for example the `breakout` partial for full-container-width, centered breakouts in markdown content:

```
{{#> breakout}}
  ![The Completed Pet Shop Dapp](/img/blog/learn-ethereum-the-fun-way-with-our-pet-shop-tutorial/pet-shop-preview.jpeg "The completed dapp.")
{{/breakout}}
```

### Helpers

Helpers are functions that take some data from metalsmith's context and transform it in into appropriate output. Arguments are separated by a space.

**NOTE**: You'll see references to the `path` variable throughout our layouts and helpers. This is an object provided via the [`metalsmith-paths` plugin](https://github.com/ahmadnassri/metalsmith-paths).

Some useful helpers include:
* `concat`: Concatenates two given strings. EX: `{{concat "string 1 and " "string2"}}`
* `getPageUrl`: Returns the current page url given a filename. EX: `{{getPageUrl path}}`
* `getMetadata`: Returns a piece of metadata given a collection name, filename, and key. For a list of possible JSON files to reference, see the top `//Data` section of `metalsmith.js`. EX: `{{getMetadata "blog" path.name "title"}}`
* `makeSlug`: Replaces spaces with dashes in a given string. Special symbols are left intact. EX: `{{makeSlug "Some Name to Slug"}}`

## Styles (Sass)

We use [Sass](https://sass-lang.com/) for stylesheets and [Bootstrap 4](http://getbootstrap.com/) as our base component library.

We try organize our stylesheets to follow these guidelines as best we can:
* `sass/overrides.scss`: Overrides to Bootstrap defaults.
* `sass/globals/*.scss`: Styles applicable to components that could be foudn on any page.
* `sass/pages/*.scss`: Page specific styles.
* `sass/vendor/*.scss`: Stylesheets for external libraries used on the site; e.g. Prism for code highlighting.

## Static Files

Static files, such as images or documents, are in the `src/img` folder and the `src/files` folder respectively. They pass through the Metalsmith build pipeline untouched.

## Search

We use [Lunr](https://lunrjs.com/) for a fully static search engine in our documentation.

To build the search index, we use a custom plugin found in the `metalsmith-moonsearch` directory. At build time, this plugin builds the index using documentation page titles and text content, then embeds it in the page for consumption by Lunr.