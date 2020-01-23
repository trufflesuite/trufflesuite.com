---
title: Truffle | Package Management via ethPM
layout: docs.hbs
---
# Package Management via ethPM

ethPM is the [Package Manager](https://www.ethpm.com/) for Ethereum. It follows the [ERC1123 spec](https://github.com/ethereum/EIPs/issues/1123) for publishing and consuming smart contract packages, and has gained wide support from many diverse Ethereum development tools. To show our support, we've integrated the Ethereum Package Registry directly into Truffle.

## Installing a package

To install a package, all you need is the [ethPM URI](TODO) that identifies the registry and package version you want to install.

It is recommended that users only install packages from registries managed by trusted developer teams. A list of popular, trusted registries can be found [here](https://docs.ethpm.com/public-registry-directory).

Installing a package from ethPM is nearly as easy as installing a package via NPM. Simply run the following command:

```shell
$ truffle install ethpm://<registry_address_or_ens>/<package name>@<version>
```

## Installing Dependencies

Your project can define an `ethpm.json` file that among other things can pin your project to specific dependencies and versions. To install all dependencies listed in the `ethpm.json` file, run:

```shell
$ truffle install
```

For more details on the `ethpm.json` file, see the [package configuration](/docs/getting_started/packages-ethpm#package-configuration) below.

## Consuming installed contracts

Installed packages will be placed in the `_ethpm_packages` directory within your project folder. If no `_ethpm_packages` directory exists it'll be created for you. You should treat this folder like you treat the `node_modules` folder with NPM -- that is, you shouldn't edit the contents inside unless you know what you're doing. :)

Installed packages can be consumed within your tests, migrations and solidity contract files by `import`'ing or `require`'ing that package and contract by name. For example, the following Solidity contract would import the `owned.sol` file from the `owned` package:

```solidity
pragma solidity ^0.5.1;

import "owned/owned.sol";

contract MyContract is owned {
  // ...
}
```

Similarly, the following migration file would use the `ENS.sol` contract from the `ens` package:

File: `./migrations/2_deploy_contracts.js`

```javascript
var ENS = artifacts.require("ens/ENS");
var MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  // Only deploy ENS if there's not already an address already.
  // i.e., don't deploy if we're using the canonical ENS address,
  // but do deploy it if we're on a test network and ENS doesn't exist.
  deployer.deploy(ENS, {overwrite: false}).then(function() {
    return deployer.deploy(MyContract, ENS.address);
  });
};
```

Note that in the migration above, we consume the `ens` package and deploy the ENS contract conditionally based on whether or not ENS already has an address set. This is a fancy trick provided to you by the [deployer](/docs/getting_started/migrations#deployer-deploy-contract-args-options-) that makes it much easier to write migrations dependent on the the existence of network artifacts. In this case, if we were running our migrations on the Ropsten network, this migration **wouldn't** deploy the `ENS` contract because (at the time of this writing) Ropsten is where the canonical `ENS` contract exists -- we wouldn't want to deploy our own. But if we were running our migrations against a different network, or a test network perhaps, then we'd want to deploy the `ENS` contract so that we have a dependency contract to work with.

## Publishing your own package

Publishing your own package is as straightforward as installing, but like NPM, requires a bit more configuration.

### Setup

By default, your package will be published to the un-authorized, public registry. This means that anybody can publish a package to this registry, so use caution when installing packages located on this registry. This registry must not be used in production, and is only provided to make it easy to begin using ethPM. We strongly recommend that you [deploy your own](https://docs.ethpm.com/ethpm-developer-guide/install-a-package#deploying-a-registry), authorized ethPM registry on the mainnet to host your packages.

To publish to any registry, we need to set up our own configuration because we'll be making transactions that need to be signed. If you are publishing to an authorized registry, you must make sure that the provided mnemonic can sign txs for an address authorized to cut releases.

In this example, we'll use Infura for publishing packages along with the `truffle-hdwallet-provider` NPM module and a 12-word hd-wallet mnemonic that represents our Ethereum address. First, install the `truffle-hdwallet-provider` via NPM within your project directory:

```shell
$ npm install truffle-hdwallet-provider --save
```

Then edit your configuration to add the `mainnet` network using your 12-word mnemonic:

File: `truffle-config.js`

```javascript
var HDWalletProvider = require("truffle-hdwallet-provider");

// 12-word mnemonic
var mnemonic = "opinion destroy betray ...";
var infuraKey = "YOUR_INFURA_PROJECT_ID";
var ethpmUri = "ethpm://YOUR_REGISTRY_ADDRESS_OR_ENS:1"

module.exports = {
  ethpm: {
    infuraKey: infuraKey,
    registry: ethpmUri
  },
  network: 'mainnet', // required?
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1
    }
  }
};
```

### Package configuration

Like NPM, configuration options for ethPM go in a separate JSON file called `ethpm.json`. This file sits alongside your Truffle configuration and gives Truffle all the information it needs to publish your package. You can see a full list of available options in the [Configuration](/docs/advanced/configuration) section.

File: `ethpm.json`

```javascript
{
  "package_name": "adder",
  "version": "0.0.3",
  "description": "Simple contract to add two numbers",
  "license": "MIT",
  "links": {
	"documentation": "www.readthedocs.com",
	"repository": "www.github.com",
	"website": "www.project.com"
  },
  "authors": [
    "Tim Coulter <tim.coulter@consensys.net>"
  ],
  "keywords": [
    "ethereum",
    "addition"
  ],
  "dependencies": { // TODO
    "owned": "^0.0.1" // TODO
  } // TODO
}
```

### Command

After you have your configuration settled, publishing is a snap:

```shell
$ truffle publish
```

You'll see output similar to that below, with confirmation that your package was published successfully.

TODO update

```shell
$ truffle publish
Gathering contracts...
Finding publishable artifacts...
Uploading sources and publishing to registry...
+ adder@0.0.3
```

### Before publishing

When using a network like the default `develop` network that's configured to match any Ethereum client (like [Ganache](/ganache) or Truffle Develop), you're bound to have network artifacts lying around that you don't want published. Before publishing your package, consider running the following command to remove any extraneous network artifacts:

```shell
$ truffle networks --clean
```

See the [command reference](/docs/advanced/commands#networks) for more information.
