# Creating an Ethereum-enabled command line tool with Truffle 3.0

Truffle 3 [is out](https://github.com/ConsenSys/truffle/releases/tag/v3.0.2), and it switched to a less opinionated build process. In Truffle 2, the default app from `truffle init` included a frontend example with build process. Now, there's nothing other than a `build` folder for your JSON contract artifacts. This opens up the door for testing and building other (**cough** command line **cough**) types of applications!

## Intended Audience
This is written for those familiar with Truffle and Ethereum, who want to learn how to create a testable, Ethereum-enabled command line application with Truffle.

For this tutorial, we'll be building a command line tool that interacts with the [Ethereum Name Service](https://ens.readthedocs.io/en/latest/) (ENS).

## Getting Started
If you were using Truffle beta 3.0.0-9 or below, **do not immediately upgrade**. Read [these release notes](https://github.com/ConsenSys/truffle/releases/tag/v3.0.2) and the [upgrade guide](/tutorials/upgrading-from-truffle-2-to-3) first. Next, make a new folder and run the following command:

```
$ truffle init
```

You should see the `test`, `build`, and `migrations` directories were created for you -- but no `app`. Additionally, the build step in the `truffle.js` file is mysteriously absent. That's ok! This means Truffle is getting out of your way and letting you control the build process.

## Let's Look at the Example
[Check out the example app](https://github.com/dougvk/ens-registrar3) as a reference. I'll be referring to it often so give it a look over if you haven't already.

The first thing to look at is the build process. Since Truffle now puts us in control of the build, I've added some custom scripts within `package.json` to handle building for us:

```json
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

I've defined two scripts here: `lint` for linting my Javascript to keep my codebase so fresh and so clean, and `ens` for transpiling my Javascript command line tool (using Babel) and running it. That's it! That's the build process. You can run it via `npm run lint` and `npm run ens`. Now that that's out of the way, let's dig into how and why I structured my app this way.

## Building our App: Separation of concerns

In order to take advantage of all parts of Truffle while building this tool, we need to separate our code into two distinct pieces. First, we need to write a library which will constitute the bulk of the app, and allow us to perform actions against the ENS contracts quickly and easily from Javascript. Next is the CLI; the CLI will take advantage of the library itself, and will be the user's interface to our application.

### The Library

The library is [lib/ens_registrar.js](https://github.com/dougvk/ens-registrar3/blob/master/lib/ens_registrar.js). Let's take a look at the constructor:

```javascript
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
The library constructor requires a few things:

1. the contract interfaces (`AuctionRegistrar` & `Deed`)
2. the address on the network of the registrar
3. a web3 provider that will be used to connect to the desired Ethereum network
4. and the account address that will provide gas for transactions.

It's crucial that the library remain ignorant of the creation of these variables if we want to take advantage of **both** Truffle's testing pipeline and a CLI. As I see it, there are two ways to use the library:
- **Through Truffle**, which manages contract addresses for testing against different networks (e.g. local, private, ropsten). Truffle makes testing our library easy.
- Once we've convinced ourselves that the library is well tested and works properly, we'll want to tell the library where to find our own contracts, provider, and account on the mainnet **through the CLI**.

Let's take a look at how the library is used in both cases.

### Use #1: Truffle Tests

Here's [test/ENS.js](https://github.com/dougvk/ens-registrar3/blob/master/test/ENS.js), a Truffle test that uses the library:
```javascript
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

  it('demonstrates that the domain name is available', (done) => {
    auctionRegistrar.available('test')
      .then((isAvailable) => {
        assert.isTrue(isAvailable)
        done()
      })
  })
...
}
```
Truffle injects a global `artifacts.require` function, a helper for finding the right compiled contract artifacts within the test environment. The test then finds a deployed instance of the Registrar on the test network via `Registrar.deployed()`. Now, with the addition of `accounts`, which is passed in via the `contract` wrapper [(see here)](http://truffleframework.com/docs/getting_started/javascript-tests), we have enough to instantiate the library and use it to test that the domain name `'test'` is available for auction.

### Use #2: the CLI

Here's [index.js](https://github.com/dougvk/ens-registrar3/blob/master/index.js), which provides our command line tool, using the library:
```javascript
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
Here I'm using the same library, `truffle-contract`, that `artifacts.require` uses under the hood. Because I can't rely on the Truffle framework within the CLI, I have to include the compiled contract artifacts manually. The rest is passed in through the CLI in `bin/ensa.js`:
```javascript
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

## Usage

You can use the command line tool against any network that has an ENS registrar deployed. First, choose a command:

```shell
$ npm run -s ens
Usage: bin/ensa.js [command] [options]

Commands:
  winner  Current winner of bid
  bid     Place a bid on a domain name
  reveal  Reveal your bid on a domain name

Options:
  --help  Show help
```

Then specify the correct options, including the `account` and `registrar`:

```shell
$ npm run -s ens -- winner -n 'NewDomain'
bin/ensa.js winner

Options:
  --help           Show help                                           [boolean]
  --host, -h       HTTP host of Ethereum node               [default: "testrpc"]
  --port, -p       HTTP port                                   [default: "8545"]
  --registrar, -r  The address of the registrar              [string] [required]
  --name, -n       The name you want to register             [string] [required]
  --account, -a    The address to register the domain name   [string] [required]

Missing required arguments: account, registrar
```

## Recap

You might be thinking to yourself, "That was a short tutorial". That's because it doesn't need to be much longer: Creating a command line application with Truffle is very similar to creating a web application, but you have to do things a bit differently. For instance, instead of a build process, your command line tool needs to grab your contract artifacts and make them ready for use. Additionally, if you want to take advantage of Truffle's tests, you need to separate your code into a command line interface and a library -- a good practice anyway -- so you can use Truffle's testing framework to test your code.

## Stay Tuned

Truffle 3.0 now makes it easier than ever to write **any** Ethereum-enabled application, and not just web apps. Stay tuned for more examples in the future where we explore Desktop and Mobile applications, too. Cheers!
