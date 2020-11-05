---
title: Teams | Configuration
layout: docs.hbs
---
# Configuration

## Repository Structure

Truffle Teams will only build repositories who have a Truffle project at the root of the repository. It looks for a `truffle-config.js` or `truffle.js` config in the root directory before building.

[comment]: <> (I'm using #### instead of ### because the styling of ### doesn't differ much from ##)
#### Configuring a Different Location for the Truffle Project

Truffle Teams doesn't currently support configuring a subfolder folder for the Truffle project, and Truffle Teams doesn't currently support more than one Truffle project. We're evaluating options to give you the ability to configure those.

## Environment Variables & Secrets

Truffle Teams currently doesn't support injecting environment variables and/or secrets into the build or deployment environments. For Builds, checkout [External CI](/docs/teams/testing/external-ci) which can enable you use an external CI provider that does have those features with Truffle Teams.

## Truffle Config File

Truffle Teams makes some assumptions and modifications to your `truffle-config.js` (or `truffle.js`) configuration file.

#### `networks` Object

When deploying, Truffle Teams ignores any user-provided options in the `networks` object provided in the config file. Truffle Teams replaces it with a single network that is associated to the network you're deploying to. The names used for that network config can be seen below; you can also use this reference in your migration script's `network` variable. All names are case sensitive.

**Mainnet Ethereum Network:** `mainnet`<br/>
**Ropsten Ethereum Network:** `ropsten`<br/>
**Görli Ethereum Network:** `goerli`<br/>
**Rinkeby Ethereum Network:** `rinkeby`<br/>
**Kovan Ethereum Network:** `kovan`<br/>
**Sandbox Network:** Use the name of your Sandbox, except single and double quotation marks are removed. Below are some examples.

`truffles-sandbox` => `truffles-sandbox`<br/>
`Truffle's "Sandbox"` => `Truffles Sandbox`
