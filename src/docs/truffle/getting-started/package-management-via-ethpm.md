---
title: Truffle | Package Management via ethpm
layout: docs.hbs
---

# Package Management via ethpm

[ethpm](https://www.ethpm.com/) is the package manager for Ethereum. It follows the [ERC1319](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1319.md) spec for publishing and consuming smart contract packages that conform to the [ERC2678](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2678.md) packaging specification. To show our support, we've integrated support for ethpm directly into Truffle.

## How to use ethpm...
An ethpm [package](https://ethpm.github.io/ethpm-spec/glossary.html#term-package) (aka release) is comprised of three data points that are recorded on an on-chain [registry](https://docs.ethpm.com/erc1319).

1. Package name (ex. `my-package`)
    - **must** conform to regex: `^[a-z][-a-z0-9]{0,255}$`
2. A package version (ex. `1.0.0`)
    - **should** conform to [semver](http://semver.org/)
3. A manifest URI (ex. `ipfs`)
    - any content-addressed uri where the [package manifest] is stored.
    - IPFS is currently the only supported filestore in truffle

An ethpm [manifest](https://ethpm.github.io/ethpm-spec/glossary.html#term-package-manifest) is simply a JSON object, that **must** comply with the [ethpm schema](https://github.com/ethpm/ethpm-spec/blob/master/spec/v3.spec.json). A manifest contains the various contract assets that can be included in an ethpm package; including bytecodes, source files, deployment data, compiler data, metadata and more.

In ethpm, there is no central [registry](https://docs.ethpm.com/erc1319). Every project must deploy and manage their own package registry where they can publish their packages. However, Truffle ships with a non-permissioned, registry to which anybody is able to publish their packages.

# ONLY INSTALL PACKAGES FROM TRUSTED REGISTRIES!
Due to the nature of the blockchain, interacting with packaged code carries a much higher risk than in other code platforms (pypi, npm, etc). A single line of malicious code in an otherwise harmless package can be the difference between a succesful project or a disastrous hack.

Only install packages from registries that are controlled by accounts or organizations whom you trust. Just because a package is available, this does not establish that it is safe. Only install packages from registries controlled by trusted wallets. Validated registry addresses should be sourced directly from an organization / project's github repo or twitter account, and preferably connected to an ENS domain name.

Truffle ships with a default unauthenticated registry, to make it easy to get started using ethpm. Practice extreme caution when interacting with the packages on this registry, as anybody can release a package on the default registry.

## How to install an ethpm package

### 1. Set your registry.
By default, your Truffle project will be connected to the default Truffle registry. Some other registries to explore include...
- `libraries.ethpm.eth`: Contains deployments of all [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/) libraries across mainnet and all testnets available to use.
- `registry.ethpm.eth`: Contains packages for ERC1319 registries, so you can easily deploy your own registry.
- [ethpm registry directory](https://docs.ethpm.com/public-registry-directory): A list of verified registries from various projects and organizations.

Once you have the registry address or ENS name, update the `ethpm/registry/address` and `ethpm/registry/network` fields in your project's `truffle-config.json`. Be sure that your `truffle-config` also includes a valid provider inside its `networks` field for the chain on which your target registry is located. Note that to use the ENS name of a registry, you must have [ENS enabled](https://www.trufflesuite.com/docs/truffle/advanced/ethereum-name-service#configuration).

### 2. Find your package.
Once you've set your ethpm registry, use the `truffle packages` command to display the available packages on the connected registry.

### 3. Install your package.
Install your package with `truffle install name[@version]`. If no version is supplied, Truffle will automatically try to install the latest release.

Other ways to install a package... (these require valid providers also).
- [ethpm URI](https://docs.ethpm.com/uris):
    - `truffle install ethpm://libraries.ethpm.eth/ownable@1.0.0`

- IPFS URI:
    - `truffle install ipfs://Qmbasdbf....`

Since all installed ethpm packages share a namespace, use the `--alias` flag to define an alternate name under which to install packages.

```
truffle install package@1.0.0 --alias another-name
```

### 4. Consuming installed contracts

Installed packages will be placed in the `_ethpm_packages/` directory within your project folder. If no `_ethpm_packages/` directory exists it'll be created for you. You should treat this folder like you treat the `node_modules` folder with NPM -- that is, you shouldn't edit the contents inside unless you know what you're doing. :)

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

### 5. Interacting with deployments.
Ethpm packages often contain on-chain deployments, so you can immediately interact with verified contract instances. After you've installed a package, simply fire up your `truffle console` and run the `networks` command to see the available instances.

## Publishing your own package

Publishing your own package is as straightforward as installing, but like NPM, requires a bit more configuration. However, currently Truffle only supports publishing solidity contracts.

### Setup

By default, your package will be published to the un-authorized, default registry. This registry must not be used in production, and was only created to simplify experimenting with ethpm. We strongly recommend that you deploy your own, authorized ethpm registry to host your packages.

To publish to any registry, we need to set up our configuration to make signed transactions. If you are publishing to an authorized registry, the signing address must also be authorized to cut a release on the connected registry.

In this example, we'll use Infura for publishing packages along with the `truffle-hdwallet-provider` NPM module and a 12-word hd-wallet mnemonic that represents our Ethereum address. First, install the `truffle-hdwallet-provider` via NPM within your project directory:

```shell
$ npm install truffle-hdwallet-provider --save
```

Then edit your configuration to add a provider using your 12-word mnemonic. The provider must be configured for the network on which the connected registry lives.

File: `truffle-config.js`

```javascript
var HDWalletProvider = require("truffle-hdwallet-provider");

// 12-word mnemonic
var mnemonic = "opinion destroy betray ...";
var infuraKey = "INFURA_PROJECT_ID";

module.exports = {
  ethpm: {
    ipfsHost: "ipfs.infura.io",
    ipfsProtocol: "https",
    ipfsPort: "5001",
    registry: {
        address: "0x123abc...", // also accepts ENS
        network: "mainnet" // must match a field in "networks" that contains a provider
    }
  },
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1
    }
  }
};
```

When generating a package, Truffle will collect all available smart contracts and deployments. To successfully generate the package, make sure that you include a provider for each chain on which a deployment is located.

### Package configuration

Like NPM, configuration options for ethpm reside in a separate JSON file called `ethpm.json`. This file sits alongside your Truffle configuration and gives Truffle all the information it needs to publish your package. You can see a full list of available options in the [Configuration](/docs/advanced/configuration) section. Keep in mind that once an ethpm package is published to a registry, it cannot be deleted or re-published under the same version to that registry.

File: `ethpm.json`

```json
{
  "name": "adder", // required
  "version": "0.0.3", // required
  "meta": {
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
    ]
  }
}
```

### Command

After you have your configuration settled, publishing is a snap:

```shell
$ truffle publish
```

You'll see output similar to that below, with confirmation that your package was published successfully.

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


### Deploy your own registry with the registry package.

To deploy your own, permissioned ethpm registry, you can use the `ethpm://registry.ethpm.eth:3/standard` package.

`truffle install ethpm://registry.ethpm.eth:3/standard`

Inside your `_ethpm_packages/` directory, you should now be able to inspect the source files for the registry contract (remember, don't edit anything inside the `_ethpm_packages/` directory).

Update your migration file to deploy the registry.

```javascript
const PackageRegistry = artifacts.require("standard/PackageRegistry")

module.exports = function(deployer) {
  deployer.deploy(PackageRegistry);
};
```
Now run `truffle migrate` and save the address of your newly deployed ethpm registry.

Note that the address used to deploy this registry will be the only account authorized to release packages onto the registry. However, ownership is transferable. It is also recommended that you connect your registry address to an ENS domain for better usability.

### Use a `libraries.ethpm.eth` libary package

Tired of wasting gas from redeploying libraries over and over? The libraries from OpenZeppelin, have been deployed to mainnet and all testnets and made available as ethpm packages on the `libraries.ethpm.eth` registry. To use any library is simple.

Install the package.
`truffle install ethpm://libraries.ethpm.eth:3/safe-math`

Then link it to any contract in your migrations file.
```javascript
const SafeMath = artifacts.require("safe-math/SafeMath")
const MyContract = artifacts.require("MyContract")

module.exports = function(deployer) {
  deployer.link(SafeMath, MyContract);
  deployer.deploy(MyContract);
};
```

### Useful links.
- ask your questions on our [gitter channel](https://gitter.im/ethpm/Lobby?source=orgpage)
- The [`ethpm-cli`](https://github.com/ethpm/ethpm-cli) is equipped with more useful commands to explore and interact with ethpm.
- [documentation](http://docs.ethpm.com/)
