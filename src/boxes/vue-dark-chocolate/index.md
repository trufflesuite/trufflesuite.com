---
hide:
  - navigation
---

# vue-dark-chocolate
A [truffle box](http://truffleframework.com/boxes/) that comes with everything you need to start using smart contracts from a [Vue](https://vuejs.org/) App with [Bootstrap](http://getbootstrap.com/) styling and components. Supporting frameworks include [Vuex](https://vuex.vuejs.org/en/intro.html), [Vue-Router](https://router.vuejs.org/en/) & Bootstrap 4 (via Bootstrap-Vue) and [webpack](https://webpack.js.org/). The sample uses [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) for hot-reloading or you can build and serve from [express](https://expressjs.com/). 

This truffle box has a simplistic smart contract model for registering/tracking trades between two accounts, written in Solidity. A vendor account registers the trade and the counterparty account has to certify it. The logic is implemented in the smart contracts to support the full trade flow but the frontend is not fully wired-up. A good exercise is to finish wiring up the frontend to go through the entire flow of registering a trade and having the counterparty certify. This provides a complete view of reading and writing to smart contracts from a dApp via truffle and web3 APIs. The sample also uses a few web3 utility methods that demonstrate how you can convert between strings/hex values from the frontend JavaScript all the way through to Solidity smart contracts on the Ethereum blockchain.

This has only been tested on Windows but _should_ work just as well on Linux _(said no one ever)_. Restart-TestRpcInstance.ps1 is the only real Windows specific item, unless you have [PowerShell on Linux](https://azure.microsoft.com/en-au/blog/powershell-is-open-sourced-and-is-available-on-linux/). That said, it just stops/starts a testrpc instance with defaults geared towards easily running this box so should be fairly easy to adapt.

To help reduce the learning curve to get started with Ethereum Blockchain and Truffle suite this sample includes some test data (in the form of testrpc accounts) and data seeding for smart contracts. To get started, you'll need to load the accounts in to Metamask. Check out testrpc-sample.md and use Metamask to import the HD Wallet mnemonic.

## Usage
If you landed here you probably already have truffle, but just in case:
`npm install -g truffle`

To initialize a project with this example, run `truffle unbox kierenh/vue-dark-chocolate` inside an empty directory.

The Ethereum test server
`npm install -g ethereumjs-testrpc`

Install [metamask](https://metamask.io/) (see also: [Truffle and Metamask](http://truffleframework.com/tutorials/truffle-and-metamask))

## Building and running smart contract unit tests
1. Start an rpc instance `Restart-TestRpcInstance.ps1 -networkID: 27666` (27666 is the ID of the network which is used at unit test time to skip data seeding, see truffle.js config)
1. Run `truffle compile`
1. Then run `truffle test --network development-no-data-seed` to deploy and test the contracts on the 'development-no-data-seed' network

Highly recommend checking out the [testing](http://truffleframework.com/docs/getting_started/testing) doc. At the very least, it's good to be aware of the CLEAN-ROOM ENVIRONMENT approach:
>CLEAN-ROOM ENVIRONMENT
>Truffle provides a clean room environment when running your test files. When running your tests against the TestRPC, Truffle will use the TestRPC's advanced snapshotting features to ensure your test files don't share state with each other. When running against other Ethereum clients like go-ethereum, Truffle will re-deploy all of your migrations at the beginning of every test file to ensure you have a fresh set of contracts to test against.

## Building and running (interact via truffle console)
1. Start an rpc instance `Restart-TestRpcInstance.ps1`
1. Then run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `truffle console`
1. See `sample_console.md` which shows how you can interact with the contracts via the console
1. To exit `.exit`

## Building and running the frontend (hot-reloading)
1. Start an rpc instance `Restart-TestRpcInstance.ps1`
1. Then run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8081 (with support for hot reloading)

## Building and running the frontend (express)
1. Start an rpc instance `Restart-TestRpcInstance.ps1`
1. Then run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run build` (see the output in the build folder)
1. Then run `npm start` to start the express server (serves the static content from the build folder)

## On migrations
In combination with smart contract design, how migrations work, and how you reference deployed contracts is fairly fundamental, so just wanted to callout these docs to accelerate your learning (hopefully).

>The Migrations contract stores (in last_completed_migration) a number that corresponds to the last applied "migration" script, found in the migrations folder. Deploying this Migrations contract is always the first such step anyway. The numbering convention is x_script_name.js, with x starting at 1. Your real-meat contracts would typically come in scripts starting at 2_....
>
>So, as this Migrations contract stores the number of the last deployment script applied, Truffle will not run those scripts again. On the other hand, in the future, your app may need to have a modified, or new, contract deployed. For that to happen, you create a new script with an increased number that describes the steps that need to take place. Then, again, after they have run once, they will not run again.<br>
[what are truffle migrations on stackoverflow](https://ethereum.stackexchange.com/questions/8299/what-are-truffle-migrations)<br>
That's right, they won't run again, ever, so make sure your contract is ready for the wild because once it's on the blockchain, it's there forever! You can't really pull it back and add a field like you might with a database table :)<br>

> When compiling and running migrations on a specific network, contract artifacts will be saved and recorded for later use. 
> When your contract abstractions detect that you're Ethereum client is connected to a specific network, they'll use the contract artifacts associated that network to simplify app deployment. <br>
[truffle docs - advanced - configuration#networks](http://truffleframework.com/docs/advanced/configuration#networks)<br>

## Possible upgrades
Upgrades welcome, just shoot through a pull request.

* Listen to events in the TradeRegister.sol and read historical events via web3 event/filter APIs
* Build and Release from VSTS to an Azure App Service [ETHEREUM DEVOPS WITH TRUFFLE, TESTRPC & VISUAL STUDIO TEAM SERVICES](http://truffleframework.com/tutorials/ethereum-devops-truffle-testrpc-vsts) & [Ethereum DevOps with VSTS – easier now with new Truffle installer + npx](https://davidburela.wordpress.com/2017/09/06/ethereum-devops-with-vsts-easier-now-with-new-truffle-installer-npx/)

## Errors and Troubleshooting

### Chrome, Metamask & TestRPC
After going through the dev-test inner-loop cycle many times, there was an instance where the web app did not retrieve the correct data from the blockchain. There were 2 trades loaded, but I could only retrieve 1, and only for some accounts.

* In the web app, I could see it was not retrieving the correct number of trades for each actor (and subsequently could not look them up * correctly) by debugging the Javascript
* In truffle console, I was able to run ad-hoc queries and get the expected results
* Truffle test - the unit tests were all passing
* I'm fairly certain I closed/re-opened browser during this time, but what seemed to do the trick was forcing metamask to re-connect to the testrpc instance so I have put this down to a quirk in metamask connecting to testrpc (certainly the versions being used anyway).

When I re-selected the network, the page refreshes and the web app returns the correct results. Basically this was just opening metamask and clicking on "Localhost 8545" which seemed to trigger some kind of refresh and things started working as expected. This post reports a similar problem: https://stackoverflow.com/questions/45585735/testrpc-the-tx-doesnt-have-the-correct-nonce
There doesn't appear to be a great solution, the advice is to close browser instances etc and reconnect to the RPC.

### truffle test
It's important to be aware that tests that don't handle exceptions thrown from within promises correctly can cause subsequent tests to fail with misleading error messages. Perhaps tests in 1 suite work, but when combined with the whole test suite they fail. This is a good indication there's an exception thrown from within a promise is not handled correctly. Be sure to add a catch() handler to the top-level promise. To help troubleshoot, you can isolate tests by running individual files in Truffle. 
`truffle test ./path/to/test/file.js`

## Dev Notes and Links

I'll leave the bulk of this to some of the resources I found helpful:<br/>
[solidity docs](http://solidity.readthedocs.io)<br/>
[web3js 1.0 docs](https://web3js.readthedocs.io/en/1.0/)<br/>
[webpack](https://webpack.js.org/)</br>
[A 101 Noob Intro to Programming Smart Contracts on Ethereum](https://medium.com/@ConsenSys/a-101-noob-intro-to-programming-smart-contracts-on-ethereum-695d15c1dab4)</br>
[Blockchain fundamentals on PluralSight](https://www.pluralsight.com/courses/blockchain-fundamentals)</br>
[bytes32 VS string types on stackoverflow](https://ethereum.stackexchange.com/questions/11556/use-string-type-or-bytes32)</br>
[Solidity - Smart Contract Design - When to use contract and when to use structs on stackoverflow](https://ethereum.stackexchange.com/questions/8615/child-contract-vs-struct)</br>
[Get started with vue-bootstrap](https://medium.com/@BMatt92656920/getting-started-with-vue-webpack-bootstrap-fb69b24e6f3d)</br>
