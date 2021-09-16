# New trufflesuite.com

A new iteration (as of Q3 2021) of trufflesuite.com built upon [mkdocs](https://www.mkdocs.org/) and the [material theme](https://squidfunk.github.io/mkdocs-material/). It also targets [ipfs](https://ipfs.io/) via the awesome [Fleek](https://fleek.co/).

## Setup

- `git clone <repo>`
  
### Installing Dependencies

- `sudo pip3 install mkdocs-material`
- `sudo pip3 install mkdocs-awesome-pages-plugin mkdocs-macros-plugin`
- `sudo pip3 install requests`

### Running Locally

- `mkdocs serve --no-livereload`

Open [http://127.0.0.1:8000](http://127.0.0.1:8000)

A full reference can be found [here](https://www.mkdocs.org/#installation).

## CSS

https://getbootstrap.com/docs/5.1/getting-started/introduction/

## Plugins

- https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin
- https://mkdocs-macros-plugin.readthedocs.io/en/latest/

### Jinja2

- [Templating Docs](https://jinja.palletsprojects.com/en/3.0.x/templates/)

## Post Build Action

This is used to generate the templated pages for each of the Truffle Boxes...

- https://mkdocs-macros-plugin.readthedocs.io/en/latest/advanced/#adding-post-build-files-to-the-html-website
- https://docs.python-requests.org/en/master/user/authentication/

## TODO

- l18n - https://github.com/ultrabug/mkdocs-static-i18n
- darkmode toggle - https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#custom-colors
