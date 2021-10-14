---
hide:
  - navigation
---

# RSK React Truffle Box

This box comes with everything you need to start using smart contracts from a react app on RSK Network. This box was ported and adapted from [React Truffle Box](https://github.com/truffle-box/react-box) to RSK.

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command via `npx` and skip to step 3. This will install all necessary dependencies. A Create-React-App is generated in the `client` directory.
   ```js
   npx truffle unbox rsksmart/rsk-react-box
   ```

2. Alternatively, you can install Truffle globally and run the `unbox` command.
    ```javascript
    npm install -g truffle
    truffle unbox rsksmart/rsk-react-box
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

8. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```
## RSK

### Setup an account & get R-BTC

- Get an address using [these instructions](https://developers.rsk.co/rsk/architecture/account-based/ "Account Based RSK Addresses - RSK Developers Portal").
- For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).
- For the RSK Mainnet, get R-BTC from [an exchange](https://developers.rsk.co/rsk/rbtc/).

### Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send RBTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To get the **minimumGasPrice** do the following steps:
1. Run this query using cURL:

    **Mainnet**

    ```shell
    curl https://public-node.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```

    **Testnet**

    ```shell
    curl https://public-node.testnet.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```

2. Find in the result the field **_minimumGasPrice_**

For more information about the **Gas** and **minimumGasPrice** please go [here](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

### Connect to RSK

1. Copy your mnemonic to `truffle-config.js`

    ```javascript
    // truffle-config.json

    const HDWalletProvider = require('@truffle/hdwallet-provider');

    //Put your mnemonic here, be careful not to deploy your mnemonic into production!
    const mnemonic = 'A_MNEMONIC';
    ```
    Please be aware that we are using `HDWalletProvider` with RSK Networks derivations path:
    - RSK Mainnet dpath: `m/44’/137’/0’/0`
    - RSK Testnet dpath: `m/44’/37310’/0’/0`

    For more information check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

2. Check the gas price of the network, and update `truffle-config.js` if necessary.

3. Run the development console for any RSK network.

    ```shell
    # Console for Mainnet
    truffle console --network mainnet

    # Console forn Testnet
    truffle console --network testnet
    ```

4. Compile and migrate the smart contracts. Note that inside the development console, we don't preface commands with truffle.

    ```shell
    compile
    migrate
    ```

**Then continue from step 5 of [installation steps](#installation)**
