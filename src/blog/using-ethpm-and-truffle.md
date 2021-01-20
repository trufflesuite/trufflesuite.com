[ethpm](https://www.ethpm.com/) is a framework-agnostic, secure protocol for packaging and distributing evm smart contracts and their on-chain deployments. Truffle now comes with built-in support for [ethpm v3](http://ethpm.github.io/ethpm-spec/v3-package-spec.html) to simplify your development workflow.

## use ethpm x truffle to ...

- **explore**
	- verfied smart contracts & protocols
	- on-chain deployments from any chain
- **install** 
	- interact with verified deployments from your truffle console
	- import packaged contracts directly in your own contract
	- re-deploy packaged contracts on any chain
	- use existing on-chain libraries, stop re-deploying every library you use
- **publish**
	- your smart contracts and deployments for other developers to use in their projects

## some ethpm definitions
- **package**: a [standardized](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2678.md) JSON object containing the smart contract assets
- **registry**: a [standardized](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1319.md) on-chain datastore that stores package identifiers
- **deployment**: a deployed instance of a contract, either on mainnet or any testnet
- **ethpm uri**: a [standardized](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2942.md) uri scheme used to identify an ethpm registry or a package
	- format: `ethpm://registry_address:chain_id/package_name@version`
	- registry example: `ethpm://libraries.ethpm.eth:3`
	- package example: `ethpm://libraries.ethpm.eth:3/safe-math@0.1.0`


# a word on trust
In any programming paradigm, using packaged code inherently requires **trust** that the author of the package does not include malicious code. With blockchains, the incentive to create malicious packages is greater - since there is direct access to valuable assets. With ethpm - you are always guaranteed to execute the code of the package author. But, we can **not** guarantee that the package author is trustworthy.

```ONLY INSTALL PACKAGES FROM TRUSTED REGISTRIES!```

There is no central registry in ethpm (eg. npm, pip, etc..). ethpm uses a federated model where individual developers, auditors, and organizations maintain their own, permissioned registry. Only the controlling account of a registry is allowed to publish packages to that registry. As long as you **trust** the controlling account of a registry, it is safe to install packages from their registry.

```ONLY INSTALL PACKAGES FROM TRUSTED REGISTRIES!```

**ANYBODY** can create an ethpm registry. **ANYBODY** can create an ethpm package. You must assume that there will be malicious packages on non-permissioned ethpm registries, trying to steal your crypto. Truffle comes connected to a non-permissioned ethpm registry by default. This is simply to enable experimentation with the ethpm protocol - and packages on this registry should **NEVER** be used in production or to manage valuable assets.

**Always** verify that a registry is maintained by a trusted source. Verification of registry addresses is best done by advertising your registry address via the `README.md` on the Github repository, or Twitter. Connecting your registry address to an ENS domain name further helps simplify the trust-establishment process.

One more time. Just because a package is available, this **DOES NOT** establish that it is safe. Trust in a package's safety is established by verifying the controlling account of the package's host registry. 

tl:dr; ```ONLY INSTALL PACKAGES FROM TRUSTED REGISTRIES!```

# 3 main commands
- `truffle packages`: list available packages on an ethpm registry
- `truffle install`:  install a package into your truffle project
- `truffle publish`: publish your truffle project as an ethpm package

# setting your truffle-config.js
Below are the default values Truffle needs to know to interact with the ethpm ecosystem. This `ethpm` config is located within a project's `truffle-config.js`. To override any of these default values for your project, include the field in your project's `truffle-config.js`.
```javascript
  ethpm: {
    ipfsHost: "ipfs.infura.io",
    ipfsProtocol: "https",
    ipfsPort: "5001",
    registry: {
      address: "0x0bd0200357D26A0bB5d1D1c1Fd56C317B68d15d5",
      network: "ropsten",
    },
    version: "3"
  },
```
* `registry` defines the address and network of the connected registry
* the specified `network` must have a matching provider available under the `networks` key
* `address` supports `0x` prefixed addresses or ENS names (to use ENS, make sure you enable ENS in your `truffle-config`)

# finding a package to install
```ONLY INSTALL PACKAGES FROM REGISTRIES YOU TRUST!```

By default, Truffle comes connected to an un-authorized ethpm registry. This means that **anybody** can publish a package to this registry. Packages hosted on this registry should **not** be considered safe to use, but they will make it easier to start playing around with ethpm.

The best place to find an interesting ethpm package is from the package author. Whether it's the organization's webpage, github repo, or a developer's twitter bio - make sure you source your packages from a registry you trust. If you can't find a registry for the contracts you want - package them up yourself, or tweet at the author to publish their contracts as an ethpm package!

## tutorial package layout
In this tutorial, we'll be using a package containing the OpenZeppelin ERC20 contract. This package is for tutorial purposes only, it has not been audited and should not be used in production.

- name: `erc20-example`
- version: `0.0.2`
- manifest uri: `ipfs://QmZH3Pz5QzT4rWS3ccsFe7ozXZ3fqj7j8FnwJ62REa4war`
- ethpm uri: `ethpm://0x0bd0200357D26A0bB5d1D1c1Fd56C317B68d15d5:3/erc20-example@0.0.2`
- layout:
	- `erc20/`
		- '_src/'
			- `ERC20.sol`
			- `IERC20.sol`
			- `GSN/Context.sol`
			- `safe-math/SafeMath.sol`
		- `deployments/`
			- `ropsten/ERC20`
			- `goerli/ERC20`
	
# `truffle packages`
To list the available packages on Truffle's default registry or the registry defined in your `truffle-config.js` - run `truffle packages`.

```bash
Searching for packages published on registry located at: 0x0bd0200357D26A0bB5d1D1c1Fd56C317B68d15d5
This registry does not appear to have permissioned releases. This means that anybody can publish a package to this registry.
Please be very careful before installing and interacting with packages on this registry.
Package: erc20-example
  - 0.0.2 @ ipfs://QmZH3Pz5QzT4rWS3ccsFe7ozXZ3fqj7j8FnwJ62REa4war
```

# `truffle install`

Installing a package will write contract assets and deployments to your project's `build/`, and source contracts to `_ethpm_packages/`. Just like `node_modules/`, you should not edit `_ethpm_packages/` folder directly.

There are a couple different options to install a package...

From the package's registry set in your `truffle-config.js`.

```bash
truffle install erc20-example@0.0.2
```

... or to install the latest version of the package.

```bash
truffle install erc20-example
````

Install a package directly with its `ethpm` URI.

```bash
truffle install ethpm://libraries.ethpm.eth:3/safe-math@1.0.0
```

Install a package directly with its manifest uri (currently, only ipfs manifest uris are supported).

```bash
truffle install ipfs://QmZH3Pz5QzT4rWS3ccsFe7ozXZ3fqj7j8FnwJ62REa4war
```

You can install any package under an alias wth the `--alias` flag, and then use the alias to reference the package. This is useful if you want to install two different packages with the same name.

```bash
truffle install erc20 --alias erc20-alternate
```
	
## interact with a deployment from an installed package
- Run `truffle console` to launch a console connected to the chain defined in your `truffle-config.js`.
- From the console, list all available deployments from the package with `networks` (only deployments found on the connected chain will be available to interact with from the console).
- Then, interact with the contracts like any other truffle contract [link](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts).

## deploy a contract from an installed package
- Simply reference the target contract with a string in the form of `"package-name/Contract"`, and run your migration like any other contract

```js
const ERC20 = artifacts.require("erc20-example/ERC20");

module.exports = function (deployer) {
  deployer.deploy(ERC20, 'test token', 'TEST');
};
```

## importing an installed contract into your contract
- importing a top-level contract
```js
import "erc20-example/ERC20.sol"
```
- importing a nested contract
```js
import "erc20-example/GSN/Context.sol"
```

## linking to a library contract in a deployment
Tired of redeploying your libraries over and over? You can find some instances of available libraries on `ethpm://libraries.ethpm.eth:3`. These have not been audited, and are not fit for use in production. 

After installing the `ethpm://libraries.ethpm.eth:1/safe-math@0.1.0` library, you can link your contracts to it like...

```js
const MyContract = artifacts.require("MyContract");
const SafeMath = artifacts.require("safe-math/SafeMath");

module.exports = function(deployer) {
  deployer.link(SafeMath, MyContract);
  deployer.deploy(MyContract)
};
```

# `truffle publish`
Publishing ethpm packages makes it easy to distribute your smart contracts and deployments for other developers to use. 

## setting your `ethpm.json`
Before you can publish a package, you must create an `ethpm.json` config file in the root-level of your truffle project. This file defines the `name`, `version`, and metadata for the published package. The only required fields are `"name"` and `"version"`, but it is recommended to use all of the metadata to describe your package.

```json
{
	"name": "my-package",
	"version": "0.0.1",
	"meta": {
		"description": "My awesome project.",
		"license": "MIT",
		"links": {
			"documentation": "www.readthedocs.com",
			"repository": "www.github.com",
			"website": "www.project.com"
		}
	},
	"authors": [
		"Me <me@gmail.com>",
		"Someone else <someoneels@gmail.com"
	],
	"keywords": [
		"ethereum",
		"ethpm",
		"solidity",
		"truffle"
	]
}
```

After setting your `ethpm.json`, just run `truffle publish` to generate and publish your package.

```bash
Finding publishable artifacts...
Generating package manifest...
Publishing package to registry...
Published my-package@0.0.1 to 0x586b308Cbef3....
```

Truffle will automatically package up all available smart contracts and deployments from your truffle project, and publish a package to the registry defined in your `truffle-confg.js`. The provider used to connect to the chain must be configured with a mnemonic to sign the transaction. The signing account must also be authorized to publish a release to the connected registry.

To publish a package doesn't need an entire protocol of smart contracts. A single smart contract can be a useful package. A single deployment can be a useful package. ethpm will store whatever data you find useful in a verifiably safe manner, so you can access your smart contract assets with a single uri.

## setting up your own ethpm registry
To deploy your own, permissioned ethpm registry, you can use the `ethpm://registry.ethpm.eth:3/standard` package. This is the official ethpm registry package, hosted on a registry maintained by the ethpm team, you can verify the address here on the [github repo](https://github.com/ethpm/solidity-registry/).

`truffle install ethpm://registry.ethpm.eth:3/standard@0.1.0`

Inside your `_ethpm_packages/` directory, you can inspect the source files for the registry contract (remember, don't edit anything inside the `_ethpm_packages/` directory).

Update your migration file to deploy the registry.

```javascript
const PackageRegistry = artifacts.require("standard/PackageRegistry")
module.exports = function(deployer) {
  deployer.deploy(PackageRegistry);
};
```
Now run `truffle migrate` and save the address of your newly deployed ethpm registry.

Note that the address used to deploy this registry will be the only account authorized to release packages onto the registry. However, ownership is transferable. It is also recommended that you connect your registry address to an ENS domain for better usability.


# need help?
- Ask your questions on our [gitter channel](https://gitter.im/ethpm/Lobby?source=orgpage)
- The [`ethpm-cli`](https://github.com/ethpm/ethpm-cli) is equipped with more useful commands to explore and interact with ethpm.
- [Documentation](http://docs.ethpm.com/)
