# New trufflesuite.com

A new version (as of **Q4 2021**) of the [trufflesuite.com](https://trufflesuite.com) site, built upon [mkdocs](https://www.mkdocs.org/) and the [material](https://squidfunk.github.io/mkdocs-material/) theme.

The goals of this release have included the following:

- Switch to better maintained static site generator (SSG) with a more robust plugin ecosystem 
- Update, and if possible remove, some of the heavier client-side dependencies
- Offer a reasonable mobile experience
- Store the site decentrally (on IPFS) and lean into more `web3` constructs
- Improve the CD pipeline

> Note that this is first iteration of this initiative and there may be a few 🐉's

## Local Setup

First up, you'll need to ensure you have Python `3.8.9` or above installed locally. You can check your current version by running `python3 --version` in your terminal. You can download the latest build [here](https://www.python.org/downloads/) or install via [brew](https://docs.brew.sh/Homebrew-and-Python) or equivalent.

Once python3 is setup you'll need to install project dependencies.
```
pip3 install -r requirements.txt
```

Assuming the above installed successfully, you can check the globally installed dependencies with `pip3 list`. Additionally, MkDocs documentation can be found [here](https://www.mkdocs.org/#installation).

### Running the Site

You can run the site locally with the following...

```
LOCAL_BUILD=true mkdocs serve
```

On Windows you may have to run as follows:

```
$env:LOCAL_BUILD = "true"
python3 -m mkdocs serve
```

Settings `LOCAL_BUILD` to true will limit the number of boxes generated to 6 boxes. To generate more boxes you'll need to add valid `TRUFFLESUITE_COM_GH_API_USERNAME` and `TRUFFLESUITE_COM_GH_API_KEY` values to your environment and then omit the `LOCAL_BUILD` flag.

By default the site will be served over [port 8000](http://127.0.0.1:8000).

## Dependencies Reference

### Client-side

At the time of writing we've removed all custom JS other than that provided by [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) itself and the following libraries and utilities.

- [Bootstrap 5.x](https://getbootstrap.com/docs/5.1/)
- [Font Awesome](https://fontawesome.com/)
- [Github Buttons](https://buttons.github.io/)

### Plugins & Libraries

The following MkDocs plugins are used by the site...

- [mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
- [mkdocs-awesome-pages-plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)
- [mkdocs-macros-plugin](https://mkdocs-macros-plugin.readthedocs.io/en/latest/)

In addition, the `requests` library is used during the site build process.

- [requests](https://docs.python-requests.org/en/latest/)

### Truffle Box Templating

The site utilizes the [Jinja](https://jinja.palletsprojects.com/en/3.0.x/templates/) templating engine for building the [Truffle Box](https://trufflesuite.com/boxes) READMEs. Specifically, during the [build process](./main.py) the box's READMEs are pulled from Github's API and stored locally before being passed through the markdown renderer.

```python
response = requests.get("https://api.github.com/repos/" + box['userOrg'] + "/" + box['repoName'] + "/readme", auth=HTTPBasicAuth('...', '...'))
json_response = response.json()
```

As a result, an extra rebuild step is required given these aren't rendered on the first pass.

```python
if not conf['extra']['rebuild']:
    conf['extra']['rebuild'] = True
    mkdocs.commands.build.build(conf)
```

## Upcoming

Note that this list will imminently be moved to Github Issues...

- remove the second build step (as above)
- localization - https://github.com/ultrabug/mkdocs-static-i18n
- further optimizations
- troubleshoot ipfs performance issues

## Connect or Contribute

As always, we greatly value contributions of all shapes and sizes. Feel free to [open an issue](https://github.com/trufflesuite/trufflesuite.com/issues), create a [pull request](https://github.com/trufflesuite/trufflesuite.com/pulls) or [get in touch](https://trufflesuite.com/community).
