# Creating a CLI with Truffle 3.0

Truffle 3 [is out](https://github.com/ConsenSys/truffle/releases/tag/v3.0.2), and it switched to less opinionated build process. In Truffle 2, the default app from `truffle init` included a frontend example with build process. Now, there's nothing other than a `build` folder for your JSON contract artifacts. This opens up the door for testing and building other (**cough** command line **cough**) types of applications!

## Intended Audience
This is written for those familiar with Truffle and Ethereum, but want a sense of how to structure testing and building a command line application on top of a library.

## Getting Started
If you were using Truffle beta 3.0.0-9 or below, **do not immediately upgrade**. Read [these release notes](https://github.com/ConsenSys/truffle/releases/tag/v3.0.2) and the upgrade guide first. Next, make a new folder and run `truffle init`. You should see `test`, `build`, and `migrations` -- but no `app`. Additionally, the build step in the `truffle.js` file is mysteriously absent. That's ok! All this means is truffle is getting out of your way and letting you control the build.

## Let's look at and example CLI
My example app [resides here](https://github.com/dougvk/ens-registrar3) as a reference. Now that truffle puts us in control of the build, I added the build step in `package.json` as an `npm` command:
```
...
"description": "CLI for ENS deployment",
"scripts": {
  "ens": "babel-node ./bin/ensa.js",
  "lint": "eslint ./"
},
"author": "Douglas von Kohorn",
"license": "MIT",
...
```
  So, I've defined two scripts here, `lint` for linting my Javascript to keep my codebase so fresh and so clean. `ens` for transpiling my Javascript command (using Babel) and running it. That's it! That's the build process. Now, let's dig into how and why I structured my app this way.

### Separation of concerns
At a high level, there's the library in `lib/ens_registrar.js` which wraps [ENS](https://ens.readthedocs.io/en/latest/) ([code here](https://github.com/ethereum/ens)). Let's look at the constructor:
```
...
constructor (AuctionRegistrar, Deed, registrarAddress, provider, fromAddress) {
  this.web3 = new Web3(provider)

  this.Deed = Deed
  this.Deed.setProvider(provider)

  AuctionRegistrar.setProvider(provider)
  AuctionRegistrar.defaults({
    from: fromAddress,
    gas: 400000
  })
  this.registrar = AuctionRegistrar.at(registrarAddress)
}
...
```
The library requires: the contract interfaces (`AuctionRegistrar` & `Deed`); the address on the network of the registrar; the web3 network address (e.g. `localhost:8545` for a default testrpc server); and the account address that will provide gas for transactions.

It's crucial that the library remain ignorant of these variables if we want to take advantage of **both** Truffle's testing pipeline and a CLI. As I see it, there are two ways to use the library:
- **Through Truffle**, which manages contract addresses for testing against different networks (e.g. local, private, ropsten). Truffle makes testing our library easy.
- Once we've convinced ourselves that the library is well tested and works properly, we'll want to tell the library where to find our own contracts, provider, and account on the mainnet **through the CLI**.

#### Concern #1: Truffle

Here's `test/ENS.js` using the library:
```
import { default as ENSAuctionLib } from '../lib/ens_registrar'
const Registrar = artifacts.require('./Registrar.sol')
const Deed = artifacts.require('./Deed.sol')

contract('ENS integration', (accounts) => {
  let auctionRegistrar

  before('set up auction registrar', (done) => {
    Registrar.deployed().then((instance) => {
      auctionRegistrar = new ENSAuctionLib(
          Registrar,
          Deed,
          instance.address,
          web3.currentProvider,
          accounts[0]
      )
    }).then(() => done())
  })

  it('demonstrates that the domain name isn\'t available', (done) => {
    auctionRegistrar.available('test')
      .then((isAvailable) => {
        assert.isTrue(isAvailable)
        done()
      })
  })
...
}
```
Truffle injects a global `artifacts.require` function, which invokes a bunch of magic to find the right compiled contract. Then it finds the instance on the test network by invoking `Registrar.deployed()`. Now, with the addition of `accounts`, which is injected via the `contract` wrapper [(see here)](http://truffleframework.com/docs/getting_started/javascript-tests), we have enough to instantiate the library and use it to test that the domain name `'test'` is available for auction.

#### Concern #2: the CLI
Here's `index.js` using the library:
```
import { default as ENSAuctionLib } from './lib/ens_registrar'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

const AuctionRegistrar = contract(require('./build/contracts/Registrar.json'))
const Deed = contract(require('./build/contracts/Deed.json'))

export default function (host, port, registrarAddress, fromAddress) {
  let provider = new Web3.providers.HttpProvider(`http:\/\/${host}:${port}`)
  return new ENSAuctionLib(
      AuctionRegistrar,
      Deed,
      registrarAddress,
      provider,
      fromAddress
  )
}
```
Here I'm using the same library, `truffle-contract`, that `artifacts.require` uses under the hood. Because I can't rely on the Truffle framework, I have to include the compiled contract artifacts manually. The rest is passed in through the CLI in `bin/ensa.js`:
```
import { default as initializeLib } from '../index'
...
let command = argv._[0]

if (command === 'bid') {
  let { name, host, max, port, registrar, account, secret } = argv
  let auctionRegistrar = initializeLib(host, port, registrar, account)
  auctionRegistrar.createBid(name, account, max, secret)
    .then(() => console.log('Created bid for ' + name))
}
```
## Extras
* Docker / Travis