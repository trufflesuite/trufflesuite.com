---
title: Truffle Quickstart
---
# Truffle Quickstart

This page will take you through the basics of creating a Truffle project and deploying a smart contract to a blockchain.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: Before you begin, make sure that you read our <a href="/guides/ethereum-overview">Ethereum Overview</a> page.
</p>

## Installing Truffle

Before you can use Truffle, you will have to install it using npm. Open a terminal and use the following to install it globally.

  ```shell
  npm install -g truffle
  ```

  <p class="alert alert-info">
  <i class="far fa-info-circle"></i> <strong>Note</strong>:  We recommend that you use npm with a node version manager like nvm, and this is actually what npm itself recommends. See <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">this article</a> from npm on installing npm with a
  node version manager.
  We also recommend against using <code>sudo</code> while installing Truffle as many users report permissions errors after doing so.
  </p>

If you run into issues during installation, feel free to post on our [GitHub Discussions](https://github.com/orgs/trufflesuite/discussions/categories/installation) page!


## Creating a project

To use most Truffle commands, you need to run them against an existing Truffle project. So the first step is to create a Truffle project.

You can create a bare project template, but for those just getting started, you can use [Truffle Boxes](/boxes), which are example applications and project templates. We'll use the [MetaCoin box](/boxes/metacoin), which creates a token that can be transferred between accounts:

1. Create a new directory for your Truffle project:

  ```shell
  mkdir MetaCoin
  cd MetaCoin
  ```

1. Download ("unbox") the MetaCoin box:

  ```shell
  truffle unbox metacoin
  ```

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: You can use the <code>truffle unbox &lt;box-name&gt;</code> command to download any of the other Truffle Boxes.
   </p>

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: To create a bare Truffle project with no smart contracts included, use <code>truffle init</code>.
   </p>

Once this operation is completed, you'll now have a project structure with the following items:

* `contracts/`: Directory for [Solidity contracts](/docs/truffle/getting-started/interacting-with-your-contracts)
* `migrations/`: Directory for [scriptable deployment files](/docs/truffle/getting-started/running-migrations#migration-files)
* `test/`: Directory for test files for [testing your application and contracts](/docs/truffle/testing/testing-your-contracts)
* `truffle-config.js`: Truffle [configuration file](/docs/truffle/reference/configuration)

## Exploring the project

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: This page is just a quickstart, so we're not going to go into much detail here. Please see the rest of the Truffle documentation to learn more.
</p>

1. Open the `contracts/MetaCoin.sol` file in a text editor. This is a smart contract (written in Solidity) that creates a MetaCoin token. Note that this also references another Solidity file `contracts/ConvertLib.sol` in the same directory.

1. Open the `migrations/1_deploy_contracts.js` file. This file is the migration script for the `MetaCoin` contract.

1. Open the `test/TestMetaCoin.sol` file. This is a [test file written in Solidity](/docs/truffle/testing/writing-tests-in-solidity) which ensures that your contract is working as expected.

1. Open the `test/metacoin.js` file. This is a [test file written in JavaScript](/docs/truffle/testing/writing-tests-in-javascript) which performs a similar function to the Solidity test above.

1. Open the `truffle-config.js` file. This is the Truffle [configuration file](/docs/truffle/reference/configuration), for setting network information and other project-related settings. The file is blank, but this is okay, as we'll be using a Truffle command that has some defaults built-in.

## Testing

To run all tests against the default `development` network, run `truffle test`. Otherwise, if you want to run tests individually, do the following:

1. In a terminal, run the Solidity test:

   ```shell
   truffle test ./test/TestMetaCoin.sol
   ```

   You will see the following output:

   ```shell
     TestMetacoin
       √ testInitialBalanceUsingDeployedContract (71ms)
       √ testInitialBalanceWithNewMetaCoin (59ms)

     2 passing (794ms)
   ```

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on <a href="/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windows">resolving naming conflicts on Windows</a>.
   </p>

   These two tests were run against the contract, with descriptions displayed on what the tests are supposed to do.

2. Run the JavaScript test:

   ```shell
   truffle test ./test/metacoin.js
   ```

   You will see the following output:

   ```shell
     Contract: MetaCoin
       √ should put 10000 MetaCoin in the first account
       √ should call a function that depends on a linked library (40ms)
       √ should send coin correctly (129ms)

     3 passing (255ms)
   ```

## Compiling

1. Compile the smart contracts:

   ```shell
   truffle compile
   ```

   You will see the following output:

   ```shell
   Compiling .\contracts\ConvertLib.sol...
   Compiling .\contracts\MetaCoin.sol...
   Compiling .\contracts\Migrations.sol...

   Writing artifacts to .\build\contracts
   ```

## Migrating with Truffle Develop

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: To use <a href="/ganache">Ganache</a>, please skip to the next section.
</p>

To deploy our smart contracts, we're going to need to connect to a blockchain. Truffle has a built-in personal blockchain that can be used for testing. This blockchain is local to your system and does not interact with the main Ethereum network.

You can create this blockchain and interact with it using [Truffle Develop](/docs/truffle/getting-started/using-truffle-develop-and-the-console#truffle-develop). Note that this will only work if the `development` network is commented out in `truffle-config.js`.

1. Run Truffle Develop:

   ```shell
   truffle develop
   ```

   You will see the following information:

   ```
   Truffle Develop started at http://127.0.0.1:9545/

   Accounts:
   (0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
   (1) 0xf17f52151ebef6c7334fad080c5704d77216b732
   (2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
   (3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
   (4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
   (5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
   (6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
   (7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
   (8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
   (9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

   Private Keys:
   (0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
   (1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
   (2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
   (3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
   (4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
   (5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
   (6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
   (7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
   (8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
   (9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

   Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

   ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
   Ensure you do not use it on production blockchains, or else you risk losing funds.

   truffle(development)>
   ```

   This shows ten accounts (and their private keys) that can be used when interacting with the blockchain.

1. On the Truffle Develop prompt, Truffle commands can be run by omitting the `truffle` prefix. For example, to run `truffle compile` on the prompt, type `compile`. The command to deploy your compiled contracts to the blockchain is `truffle migrate`, so at the prompt, type:

   ```shell
   migrate
   ```

   You will see the following output:

    ```
    Starting migrations...
    ======================
    > Network name:    'development'
    > Network id:      1658402567991
    > Block gas limit: 30000000 (0x1c9c380)


    1_deploy_contracts.js
    =====================

      Deploying 'ConvertLib'
      ----------------------
      > transaction hash:    0xd8b6156da444b956b47921d13a4bf9ff24194450e7142ccd787cf02095f0ea50
      > Blocks: 0            Seconds: 0
      > contract address:    0xDB6AB7B200F9dDA31a9672a30e09Fc39EA953Cf3
      > block number:        1
      > block timestamp:     1658402580
      > account:             0x2C42f79f8565C58855ABADc148eE5c55fa3Fd615
      > balance:             999.999468208
      > gas used:            157568 (0x26780)
      > gas price:           3.375 gwei
      > value sent:          0 ETH
      > total cost:          0.000531792 ETH


      Linking
      -------
      * Contract: MetaCoin <--> Library: ConvertLib (at address: 0xDB6AB7B200F9dDA31a9672a30e09Fc39EA953Cf3)

      Deploying 'MetaCoin'
      --------------------
      > transaction hash:    0x5a81aae757842a8784a7931e533496e37a6ad238dc76c12fd08c7c5cb540f405
      > Blocks: 0            Seconds: 0
      > contract address:    0x017CA14d13A711f38153a62738B81b527231e44e
      > block number:        2
      > block timestamp:     1658402580
      > account:             0x2C42f79f8565C58855ABADc148eE5c55fa3Fd615
      > balance:             999.998107328781026412
      > gas used:            416582 (0x65b46)
      > gas price:           3.266773934 gwei
      > value sent:          0 ETH
      > total cost:          0.001360879218973588 ETH

      > Saving artifacts
      -------------------------------------
      > Total cost:     0.001892671218973588 ETH

    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.001892671218973588 ETH
    ```

   This shows the transaction IDs and addresses of your deployed contracts. It also includes a cost summary and real-time status updates.

   <p class="alert alert-info">
     <i class="far fa-info-circle"></i> <strong>Note</strong>: Your transaction hashes, contract addresses, and accounts will be different from the above.
   </p>

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: To see how to interact with the contract, please skip to the next section.
</p>


## Alternative: Migrating with Ganache

While Truffle Develop is an all-in-one personal blockchain and console, you can also use [Ganache](/ganache), a desktop application, to launch your personal blockchain. Ganache can be a more easy-to-understand tool for those new to Ethereum and the blockchain, as it displays much more information up-front. 

Note that Ganache can also be started from the CLI. Get started [here](https://github.com/trufflesuite/ganache#getting-started).

The only extra step, aside from running Ganache, is that it requires editing the Truffle configuration file to point to the Ganache instance.

1. Download and install [Ganache](/ganache).

1. Open `truffle-config.js` in a text editor. Uncomment the `development` configuration. Make sure to adjust the port number to whatever port Ganache is running on.

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 8545,
         network_id: "*"
       }
     }
   };
   ```

   This will allow a connection using Ganache's default connection parameters.

1. Save that file.

1. Launch Ganache.

   ![Ganache](/img/docs/ganache/quickstart/accounts.png)

   *Ganache*

1. On the terminal, migrate the contract to the blockchain created by Ganache:

   ```shell
   truffle migrate
   ```

   You will see the following output:

   ```
   Compiling your contracts...
   ===========================
   > Compiling ./contracts/ConvertLib.sol
   > Compiling ./contracts/MetaCoin.sol
   > Compiling ./contracts/Migrations.sol
   > Artifacts written to /home/david/work/MetaCoin/build/contracts
   > Compiled successfully using:
      - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

   Starting migrations...
   ======================
   > Network name:    'development'
   > Network id:      5777
   > Block gas limit: 6721975 (0x6691b7)

   1_initial_migration.js
   ======================

      Deploying 'Migrations'
      ----------------------
      > transaction hash:    0x3eef05e35ce694c0b7112cc22ba462b9cc0563abc2cc444ee9683b6d89865e3c
      > Blocks: 0            Seconds: 0
      > contract address:    0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0
      > block number:        1
      > block timestamp:     1587421933
      > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
      > balance:             99.9967165
      > gas used:            164175 (0x2814f)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.0032835 ETH

      > Saving migration to chain.
      > Saving artifacts
      -------------------------------------
      > Total cost:           0.0032835 ETH

   2_deploy_contracts.js
   =====================

      Deploying 'ConvertLib'
      ----------------------
      > transaction hash:    0x23de020bafa41e30615b1d775d2fa9604e876415408e012d1f0faf79eed3a32f
      > Blocks: 0            Seconds: 0
      > contract address:    0x345cA3e014Aaf5dcA488057592ee47305D9B3e10
      > block number:        3
      > block timestamp:     1587421933
      > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
      > balance:             99.99396028
      > gas used:            95470 (0x174ee)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.0019094 ETH

      Linking
      -------
      * Contract: MetaCoin <--> Library: ConvertLib (at address: 0x345cA3e014Aaf5dcA488057592ee47305D9B3e10)

      Deploying 'MetaCoin'
      --------------------
      > transaction hash:    0x0cc20353422c4d435f72e8e7850f8178f43bf8d00c8c0d09cc8e0ccdfa81b799
      > Blocks: 0            Seconds: 0
      > contract address:    0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF
      > block number:        4
      > block timestamp:     1587421934
      > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
      > balance:             99.98822922
      > gas used:            286553 (0x45f59)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.00573106 ETH

      > Saving migration to chain.
      > Saving artifacts
      -------------------------------------
      > Total cost:          0.00764046 ETH

   Summary
   =======
   > Total deployments:   3
   > Final cost:          0.01092396 ETH
   ```

   This shows the transaction IDs and addresses of your deployed contracts. It also includes a cost summary and real-time status updates.

   <p class="alert alert-info">
     <i class="far fa-info-circle"></i> <strong>Note</strong>: Your transaction IDs and contract addresses may be different from the above.
   </p>

1. In Ganache, click the "Transactions" button to see that the transactions have been processed.

1. To interact with the contract, you can use the Truffle console. The Truffle console is similar to Truffle Develop, except it connects to an existing blockchain (in this case, the one generated by Ganache).

   ```shell
   truffle console
   ```

   You will see the following prompt:

   ```
   truffle(development)>
   ```

## Interacting with the contract

Interact with the contract using the console in the following ways:

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: We're using <code>web3.eth.getAccounts()</code> in these examples, which returns a promise which resolves to an array of all the accounts generated by the mnemonic. So, given the addresses generated by our mnemonic above, specifying <code>(await web3.eth.getAccounts())[0]</code> is equivalent to the address <code>0x627306090abab3a6e1400e9345bc60c78a8bef57</code>.
</p>

As of Truffle v5, the console supports async/await functions, enabling much simpler interactions with the contract.

* Begin by establishing both the deployed MetaCoin contract instance and the accounts created by either Truffle's built-in blockchain or Ganache:

  ```javascript
  truffle(development)> let instance = await MetaCoin.deployed()
  truffle(development)> let accounts = await web3.eth.getAccounts()
  ```

* Check the metacoin balance of the account that deployed the contract:

  ```javascript
  truffle(development)> let balance = await instance.getBalance(accounts[0])
  truffle(development)> balance.toNumber()
  ```

* See how much ether that balance is worth (and note that the contract defines a metacoin to be worth 2 ether):

  ```javascript
  truffle(development)> let ether = await instance.getBalanceInEth(accounts[0])
  truffle(development)> ether.toNumber()
  ```

* Transfer some metacoin from one account to another:

  ```javascript
  truffle(development)> instance.sendCoin(accounts[1], 500)
  ```

* Check the balance of the account that *received* the metacoin:

  ```javascript
  truffle(development)> let received = await instance.getBalance(accounts[1])
  truffle(development)> received.toNumber()
  ```

* Check the balance of the account that *sent* the metacoin:

  ```javascript
  truffle(development)> let newBalance = await instance.getBalance(accounts[0])
  truffle(development)> newBalance.toNumber()
  ```

## Continued learning

This quickstart showed you the basics of the Truffle project lifecycle, but there is much more to learn! Want to get set up as fast as possible? Check out our [Truffle Boxes](https://trufflesuite.com/boxes/). Please continue on with the rest of our [documentation](/docs) and especially our [guides](/guides) or [tutorial](/tutorial) to learn more.
