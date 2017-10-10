# Using Infura (or any custom provider)

[Infura](https://infura.io/) is a hosted Ethereum node cluster that lets your users run your application without requiring them to set up their own Ethereum node or wallet. For security reasons Infura does not manage users' private keys, which means they cannot sign transactions on your behalf (or your users' behalf). Similarly, Truffle doesn't intuitively know how to sign your transactions -- it usually hands that task over to the Ethereum node -- so if you'd like to deploy your contracts using Infura, you must first tell Truffle how you'd like these transactions signed.

Fortunately libraries can help us along. In this example we'll use an [hd wallet mnemonic](https://en.bitcoin.it/wiki/Deterministic_wallet) to generate our list of wallets, and we'll use the [web3-provider-engine](https://github.com/MetaMask/provider-engine) to provide us with built-in signing functionality.

### Getting Started

First install the required dependencies:

```
$ npm install ethereumjs-wallet bip39 web3-provider-engine web3
```

We recommend you run the above command with the `--save` flag to save this configuration in your project's `package.json` file.

### Editing Your Project's Configuration

We can use your project's `truffle.js` configuration file to tell Truffle how to sign our transactions. To start, we should first require all of our dependencies used for signing transactions:

```javascript
var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
```

These dependencies are used for the following things:

- `bip39`: Used to create a seed from hd wallet mnemonics (more on that later).
- `hdkey`: Used to derive addresses from seeds using complex math.
- `ProviderEngine`: The basic framework that will be used to wrangle all transactions that need to be signed.
- `WalletSubprovider`: Part of the provider engine framework that will handle wallet signing.
- `Web3Subprovider`: Part of the provider engine framework that handles everything *other than* transaction signing.
- `Web3`: What we used to communicate with the Ethereum network. Here, we're using it solely to create a provider.

After setting up are dependencies, we'll then need to create an hd wallet from a mnemonic. A mnemonic is a twelve word string that represents a secure random seed (warning: don't just create a mnemonic yourself; use the bip39 library to do this if you don't have one). From this seed we can create an unlimited number of Ethereum addresses and private keys. Because this is a seed, we can always use this mnemonic to find those addresses again.

```javascript
// Get our mnemonic and create an hdwallet
var mnemonic = "couch solve unique spirit wine fine occur rhythm foot feature glory away";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
```

From here we can use the hdwallet to derive the first account. We do so using something called an "hd path", which is a way of telling the complex mathematics what we're attempting to derive. The most important bit is when we add "0" on the end of the hd path. This means we want to find the first account that we can derive from this hd wallet. It's zero based, so if we wanted the second address we'd derive `wallet_hdpath + "1"`, and for the third address `wallet_hdpath + "2"`, etc.

```javascript
// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");
```

Next, we need to set up the Provider Engine, telling it that we'd like to use our wallet to sign transactions, and use the ropsten network on infura for everything else:

```javascript
var providerUrl = "https://testnet.infura.io";
var engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.
```

Finally, we want to export our Truffle configuration. Here we use this wallet only when we want to deploy to the ropsten network:

```javascript
module.exports = {
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address     // Use the address we derived
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
};
```

### Discussion

In general, this is a lot of work in order to use an hd wallet with Truffle. This is a very early feature, and we'd highly encourage anyone to create a new library that encapsulates the above code.

### Full Code

```javascript
var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

// Get our mnemonic and create an hdwallet
var mnemonic = "couch solve unique spirit wine fine occur rhythm foot feature glory away";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://testnet.infura.io";
var engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address     // Use the address we derived
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
};
```
