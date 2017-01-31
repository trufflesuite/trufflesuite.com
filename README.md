## The Truffle Suite Website

This is a [Metalsmith](http://www.metalsmith.io/) project. All content lives under the `_site` subdirectory. Do not change **anything** in the project root directory, as it will be overwritten by the compile step.

Much of the static build process is coded by hand, to reflect the previous build system, Harp.js. All of this is coded in a middleware-like structure in `_site/metalsmith.js`.

## Development

Make sure you have run `npm install` in the `_site` subdirectory to install all dependencies.

To run a local dev server, under the `_site` subdirectory, run:

0. `npm run dev`


To compile the site, under the `_site` subdirectory, run:

0. `npm run compile`

Running the compile step will refresh the compiled content in the project root directory. At this point you can commit
changes and push up to Github Pages and the site will live update.

## Contributing

**Please do not submit PRs with the compilation step run.** This generates un-necessarily large PRs which makes
assessing the changes difficult. Someone from the Truffle team will perform the compile & push step once
your PR has been accepted.
