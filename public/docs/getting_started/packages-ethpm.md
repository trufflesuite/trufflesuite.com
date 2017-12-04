# Package management via EthPM

EthPM is the new [Package Registry](https://www.ethpm.com/) for Ethereum. It follows the [ERC190 spec](https://github.com/ethereum/EIPs/issues/190) for publishing and consuming smart contract packages, and has gained wide support from many diverse Ethereum development tools. To show our support, we've integrated the Ethereum Package Registry directly into Truffle.

## Installing a package

Installing a package from EthPM is nearly as easy as installing a package via NPM. You can simply run the following command:

```
$ truffle install <package name>
```

You can also install a package at a specific version:

```
$ truffle install <package name>@<version>
```

Like NPM, EthPM versions follow [semver](http://semver.org/). You can find a list of all available packages at [the Ethereum Package Registry](https://www.ethpm.com/registry).

## Installing Dependencies

Your project can define an `ethpm.json` file that among other things can pin your project to specific dependencies and versions. To install all dependencies listed in the `ethpm.json` file, run:

```
$ truffle install
```

For more details on the `ethpm.json` file, see the [package configuration](/docs/getting_started/packages-ethpm#package-configuration) below.

## Consuming installed contracts

Installed packages will be placed in the `installed_contracts` directory within your project folder. If no `installed_contracts` directory exists it'll be created for you. You should treat this folder like you treat the `node_modules` folder with NPM -- that is, you shouldn't edit the contents inside unless you know what you're doing. :)

Installed packages can be consumed within your tests, migrations and solidity contract files by `import`'ing or `require`'ing that package and contract by name. For example, the following Solidity contract would import the `owned.sol` file from the `owned` package:

```javascript
pragma solidity ^0.4.2;

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

### Ropsten, Ropsten, Ropsten

The Ethereum Package Registry currently exists on the Ropsten test network. To publish to the registry, we need to set up our own Ropsten configuration because we'll be making transactions that need to be signed.

In this example, we'll use Infura for publishing packages along with the `truffle-hdwallet-provider` NPM module and a 12-word hd-wallet mnemonic that represents our Ethereum address on the Ropsten network. First, install the `truffle-hdwallet-provider` via NPM within your project directory:

```
$ npm install truffle-hdwallet-provider --save
```

Then edit your configuration to add the `ropsten` network using your 12-word mnemonic:

File: `truffle.js`

```javascript
var HDWalletProvider = require("truffle-hdwallet-provider");

// 12-word mnemonic
var mnemonic = "opinion destroy betray ...";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: 3 // official id of the ropsten network
    }
  }
};
```

### Package configuration

Like NPM, configuration options for EthPM go in a separate JSON file called `ethpm.json`. This file sits alongside your Truffle configuration and gives Truffle all the information it needs to publish your package. You can see a full list of available options in the [Configuration](/docs/advanced/configuration) section.

File: `ethpm.json`

```javascript
{
  "package_name": "adder",
  "version": "0.0.3",
  "description": "Simple contract to add two numbers",
  "authors": [
    "Tim Coulter <tim.coulter@consensys.net>"
  ],
  "keywords": [
    "ethereum",
    "addition"
  ],
  "dependencies": {
    "owned": "^0.0.1"
  },
  "license": "MIT"
}
```

### Command

After you have your configuration settled, publishing is a snap:

```
$ truffle publish
```

You'll see output similar to that below, with confirmation that your package was published successfully.

```
$ truffle publish
Gathering contracts...
Finding publishable artifacts...
Uploading sources and publishing to registry...
+ adder@0.0.3
```

### Before publishing

When using a network like the default `develop` network that's configured to match any Ethereum client (like [Ganache](/ganache) or Truffle Develop), you're bound to have network artifacts lying around that you don't want published. Before publishing your package, consider running the following command to remove any extraneous network artifacts:

```
$ truffle networks --clean
```

See the [command reference](/docs/advanced/commands#networks) for more information.
