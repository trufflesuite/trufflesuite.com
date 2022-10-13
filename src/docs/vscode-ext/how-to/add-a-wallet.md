# Add a wallet provider to your existing project

If you're using a Truffle box or you've create your own project structure, and you want to use the
deployment options in the extension, you can add a wallet provider to your project.

## Steps

1. Update your project to include the required package for the wallet. The underlying requirement is for [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider).
   If you have an existing package.json as part of your project, you can simply add the following to your dependencies section:

   ```json
   "truffle-hdwallet-provider": "1.0.10"
   ```

   If you do **NOT** have an existing package.json as part of your project, you can create one by running the following:

   ```shell
   npm init -y
   npm install truffle-hdwallet-provider@1.0.10 --save
   ```

2. Update the truffle configuration to include the use of the wallet provider and a native node package to access the file system. This should be added to top of the package.json file.

   ```javascript
   const HDWalletProvider = require('truffle-hdwallet-provider');
   const fs = require('fs');
   ```

3. To deploy locally to the managed ganache instance inside the extension, the wallet is **NOT** required. What is required to use the deployment is a network section for development. If this is not present in the package.json file, this can be added to the networks section.

   ```json
   development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
   }
   ```

4. To deploy to another target, no other configuration is needed. When selecting deploy contracts, the relevant network section will be added dynamnically to the truffle configuration.

5. To deploy to another target, that has been manually added to the truffle configuration, the provider will need to be added manually. Updated the truffle configuration, specific network section to use this provider:

   ```json
   provider: new HDWalletProvider(fs.readFileSync('<path to a file with a 12 work mnemonic', 'utf-8'), "<uri to rpc endpoint>")
   ```

`NOTE:` Some older truffle boxes use a truffle configuration file named truffle.js, versus the new one of using truffle-config.js. This is required for Windows based use of the Truffle suite.
