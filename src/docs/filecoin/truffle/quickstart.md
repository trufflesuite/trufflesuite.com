---
title: Filecoin Quickstart
layout: docs.hbs
---

# Filecoin Quickstart

Wanna build apps on Filecoin using Truffle? You're in the right place.

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>Looking to set up Filecoin-flavored Ganache?</strong> Head over to the <a href="/docs/filecoin/ganache/overview">Ganache-specific documentation</a>.
</p>

## Getting Set Up

### Requirements

* [NodeJS](https://nodejs.org/) v12.13.0 or later
* Windows, Linux or Mac OS X

## Installing Truffle

Truffle's Filecoin integration works out of the box with the latest Truffle, so no need to install any special versions for it.

    $ npm install -g truffle

## Using the Filecoin Truffle Box

This quick start uses an already-created project to provide the base Truffle project structure and example contracts.

In your workspace directory, run the following commands:

    $ mkdir filecoin-example
    $ cd filecoin-example
    $ truffle unbox filecoin

More specific usage information about the Filecoin Truffle Box can be found in its [README](https://github.com/truffle-box/filecoin-box).

## Preserving files to IPFS and Filecoin

Truffle offers builtin functionality to preserve any files and directories to IPFS, Filecoin or Textile Buckets through the `truffle preserve` command. This works with local IPFS / Filecoin nodes, remote nodes and Filecoin-flavored Ganache! Besides this, `truffle preserve` also has support for [Textile Buckets](https://docs.textile.io/buckets/), which offers a smooth user experience around IPFS and Filecoin.

```shell
$ truffle preserve ./stuff --ipfs
$ truffle preserve ./stuff --filecoin
$ truffle preserve ./stuff --buckets
```

For extensive documentation on `truffle preserve` refer to the [main Truffle documentation](/docs/truffle/getting-started/preserving-files-and-content-to-storage-platforms).

## Further Resources

If you've reached this point, you now have a Truffle project that lets you interact with the Filecoin network. Congrats! This is a great start, but there's still much to learn. We suggest you check out the following resources to learn more about Filecoin, Textile, Ganache, and the entire Truffle Suite:

* [Filecoin documentation](https://docs.filecoin.io/)
* [Textile documentation](https://docs.textile.io/)
* [Filecoin-flavored Ganache documentation](/docs/filecoin/ganache/overview)
* [Main Truffle Suite documentation](/docs)

