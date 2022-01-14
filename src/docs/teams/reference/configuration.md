---
title: Teams | Configuration
layout: docs.hbs
---

# Configuration

## Repository structure

Truffle Teams will only build repositories who have a Truffle project at the root of the repository. It looks for a `truffle-config.js` or `truffle.js` config in the root directory before building.

[comment]: <> (I'm using #### instead of ### because the styling of ### doesn't differ much from ##)

#### Configuring a different location for the Truffle project

Truffle Teams doesn't currently support configuring a subfolder folder for the Truffle project, and Truffle Teams doesn't currently support more than one Truffle project. We're evaluating options to give you the ability to configure those.

## Environment variables & secrets

Truffle Teams currently doesn't support injecting environment variables and/or secrets into the build or deployment environments. For Builds, checkout [External CI](/docs/teams/builds/external-ci) which can enable you use an external CI provider that does have those features with Truffle Teams.

## Truffle config file

Truffle Teams makes some assumptions and modifications to your `truffle-config.js` (or `truffle.js`) configuration file.

#### `networks` object

When deploying, Truffle Teams ignores any user-provided options in the `networks` object provided in the config file. Truffle Teams replaces it with a single network that is associated to the network you're deploying to. The names used for that network config can be seen below; you can also use this reference in your migration script's `network` variable. All names are case sensitive.

**Mainnet Ethereum Network:** `mainnet`<br/>
**Ropsten Ethereum Network:** `ropsten`<br/>
**Görli Ethereum Network:** `goerli`<br/>
**Rinkeby Ethereum Network:** `rinkeby`<br/>
**Kovan Ethereum Network:** `kovan`<br/>
**Sandbox Network:** Use the name of your Sandbox, except single and double quotation marks are removed. <br />
`truffles-sandbox` => `truffles-sandbox`<br/>
`Truffle's "Sandbox"` => `Truffles Sandbox`
