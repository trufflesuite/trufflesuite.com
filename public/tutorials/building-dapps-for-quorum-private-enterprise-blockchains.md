# Building dapps for Quorum: Private Enterprise Blockchains

Ethereum is perhaps best defined by its public network, a network where every transaction -- and all participants of each transaction -- are publicly available to anyone looking at its transaction history. Truffle got its start building for the public blockchain: at the time of Ethereum's launch, the public blockchain was the only smart contract blockchain around. However since launch, technology has changed, most notably with [Quorum](https://github.com/jpmorganchase/quorum/wiki), the permissioned blockchain initially developed by JP Morgan.

Quorum is a version of Ethereum that adds new features on top of what Ethereum already provides. Specifically, Quorum adds the ability to create private blockchains between select participants, and more importantly adds transaction privacy on top of your normal everyday Ethereum transactions. Let's use a quick example: Say Bob, Tom and Alice all create a blockchain together, and Alice wants to send 20 TruffleCoin to Bob. But here's the kicker: she doesn't want Tom (or anyone else other than Bob) to know, because she cares about her privacy. Using Quorum, Alice could easily send a transaction where the transaction data is only available to her and Bob.

Transaction privacy presents a number of useful use cases, especially in the enterprise and banking worlds. For instance, large banks might want to take advantage of blockchain technologies like Ethereum but don't want their transactions to be publicly available to everyone as a matter of doing business. Quorum presents a useful alternative.

This tutorial represents Truffle's official support for Quorum. By the end of this tutorial you'll learn how to use both Truffle and Quorum together to build privacy-enabled dapps.

## Requirements

This tutorial expects you to have some knowledge of Truffle, Ethereum, Quorum and Solidity. For more information on these topics, please see the following links:

* [Truffle documentation](/docs/)
* [Etheruem overview](https://ethereum.org/)
* [Quorum overview](https://www.jpmorgan.com/country/US/EN/Quorum) and [documentation](https://github.com/jpmorganchase/quorum/wiki)
* [Solidity documentation](https://solidity.readthedocs.io/en/develop/)

You will primarily be using the command line for this tutorial. Ensure you have basic familiarity with opening and using the command line provided by your operating system. Additionally, you will need the following software. Ensure it is installed before proceeding:

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)
* [git](https://git-scm.com/downloads)

## Getting Started

In this tutorial, we'll show you how to develop dapps for Quorum using Truffle and Quorum's [7nodes example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes). You'll learn how to:

1. Set up a Quorum client
2. Configure Truffle, and point it at Quorum
3. Use Truffle to deploy smart contracts on Quorum
4. Use Quorum's privacy features to make transactions private

Also in this tutorial, you'll see that developing for Quorum using Truffle is _exactly like_ developing for the public Ethereum blockchain. Truffle supports Quorum out of the box, and the same strategies and methods for building Ethereum-enabled applications for the Ethereum public blockchain also apply to building dapps on Quorum.

## 1. Setting up your Quorum client

The Quorum client is a replacement for the Ethereum client. Using the Quorum client, you can set up a private blockchain that's only available to you and the people you allow to participate.

In this example, we're going to use a Quorum cluster of seven nodes -- i.e., seven Quorum clients -- already set up and configured for us inside a virtual machine. You _could_ choose to install Quorum yourself by [downloading it directly](https://github.com/jpmorganchase/quorum) and building it from source, but for this example, using the pre-configured cluster is much easier. To set up the cluster, open the command line and navigate to a folder where you'd like it installed. Here, we chose the folder `workspace`:

```shell
$ cd workspace
$ git clone https://github.com/jpmorganchase/quorum-examples
```

Next, we'll want to use `vagrant` (you should have installed it along with VirtualBox above) to initialize the cluster's virtual machine. Note that this step could take up to five minutes as it makes the virtual machine ready for use.

```shell
$ cd quorum-examples
$ vagrant up
```

After `vagrant up` successfully completes, we'll want a way to access our newly minted virtual machine. Note that a virtual machine is like another computer running inside of your own, and so we'll need a way to access it in order to run commands within the machine. Luckily `vagrant` provides just such a feature. Note that after running this command, our command line changes to show `ubuntu@ubuntu-xenial:~$`, designating that we're running commands inside the virtual machine.

```shell
$ vagrant ssh
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-75-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

8 packages can be updated.
0 updates are security updates.


Last login: Mon May  1 20:21:21 2017 from 10.0.2.2
ubuntu@ubuntu-xenial:~$
```

While we're here, let's navigate to the example we want to run:

```shell
ubuntu@ubuntu-xenial:~$ cd quorum-examples/7nodes/
```

Our Quorum client is nearly ready to go. We need to run two more commands within the virtual machine. The first one creates seven Quorum nodes we can use to simulate a real Quorum deployment -- you only need to do this once, ever. The second one starts up those seven nodes; you should perform this one anytime you restart the virtual machine:

```shell
ubuntu@ubuntu-xenial:~/quorum-examples/7nodes$ init.sh
ubuntu@ubuntu-xenial:~/quorum-examples/7nodes$ start.sh
```

Success! We now have seven Quorum nodes set up that we can use to represent seven different actors on our private network.

## 2. Setting up Truffle

To set up Truffle, we're going to start by creating a bare Truffle project, without any contracts or code. Before doing this, make sure to open up a new command line window. We want to leave the old command line window alone, and let the Quorum example run without bothering it. In the new command line window, navigate to your workspace and create a new directory for your Truffle project. Note that if you're using Windows, the commands you'll type might be slightly different.

```shell
$ cd workspace
$ mkdir myproject
```

Next, navigate to the new directory and initialize the bare Truffle project:

```shell
$ cd myproject
$ truffle init bare
```

If you look at the contents of the `myproject` directory, you'll notice folders were created for you. See the [Truffle documentation](/docs/getting_started/project) for more information about Truffle's project structure.

Before moving onto code, we need to configure Truffle to point to our running Quorum client. For this example, we'll change our `development` configuration within `truffle.js` to point to the first node available in the 7nodes example.

```javascript
// File: `truffle.js` (edited for 7nodes example)
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 22000, // was 8545
      network_id: "*" // Match any network id
    }
  }
};
```

Note that the only thing we had to change was the `port` that Truffle connects to (we changed it to `22000`). Because of the magic of VirtualBox and Vagrant, the node running inside the virtual machine is made available to us via local ports, so connecting via `localhost` and `22000` will work just fine.

Now that we have Truffle set up, we can move onto code.

## 3. Deploying Smart Contracts on Quorum

We won't spend too much time talking about writing or deploying contracts in Truffle since we have [ample documentation](/docs), however we do want to show how deploying contracts applies to Quorum.

First, copy the following contract into a new file, called `SimpleStorage.sol`. Place it in your `contracts` directory:

```javascript
// File: `./contracts/SimpleStorage.sol`
pragma solidity ^0.4.8;

contract SimpleStorage {
  uint public storedData;

  function SimpleStorage(uint initVal) {
    storedData = initVal;
  }

  function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint retVal) {
    return storedData;
  }
}
```

You can make sure this contract compiles using the command `truffle compile` within your project directory.

Next, create a new migration called `2_deploy_simplestorage.js` within your `migrations` directory. Note that this migration is just like any other you'd create for Truffle, but there's one important difference. Let's see if you can catch it.

```javascript
// File: `./migrations/2_deploy_simplestorage.js`
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
};
```

If you guessed the difference was `privateFor`, you got it! `privateFor` is an extra transaction parameter added to Quorum that specifies that the transaction you're making -- in this case a contract deployment -- is private for a specific account, identified by the given public key. For this transaction, the public key we chose represents node 7. Since we previously configured Truffle to connect to the first node, this transaction will deploy a contract from node 1, making the transaction private for node 1 and node 7.

Now it's time to deploy your contracts. Run the `truffle migrate` command and watch your contracts be successfully deployed:

```shell
$ truffle migrate
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: 0x721650d027d87cd247a3a776c4b6170bf1e5b936
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_simplestorage.js
  Deploying SimpleStorage...
  SimpleStorage: 0x10ae69385c79ef3eb815ac008a7013d6878f1d38
Saving successful migration to network...
Saving artifacts...
```

Now that the contract's deployed, it's off to the races.

## 4. Exploring Our Privacy

In step 2 we configured Truffle to point our development environment to the first of the seven nodes provided by the example. You can think of the first node as "us", as if we were developing a dapp for a private network that's used by multiple other parties. Since the 7nodes example provides us seven nodes to work with, we can tell Truffle about the other nodes so we can "be" someone else, and ensure the contract we deployed was private.

To add a new network configuration, edit your `truffle.js` file and add another configuration, choosing a network name that best describes what that network connection you're adding. In this case, we're going to add a connection to node four and node seven:

```javascript
// File: `truffle.js`
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 22000, // was 8545
      network_id: "*" // Match any network id
    },
    nodefour:  {
      host: "localhost",
      port: 22003,
      network_id: "*" // Match any network id
    },
    nodeseven:  {
      host: "localhost",
      port: 22006,
      network_id: "*" // Match any network id
    }
  }
};
```

Like before, VirtualBox and Vagrant are making these nodes available to us through local ports, so these configurations can look the same as our `development` configuration except with a different ports specified. Note that node four is someone who was *not* privy to the contract we deployed, whereas node seven was.

Now that our configuration is set up, we can use the Truffle console to interact with our deployed contract. First let's be "us" -- i.e., node one, configured via our `development` configuration. The easiest way to do this is to launch the Truffle console, which lets us interact with our deployed Contracts directly. Here, we'll get the deployed instance of the SimpleStorage contract and then get the integer value we specied on deployment.


```shell
$ truffle console
truffle(development)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '42'] s: 1, e: 1, c: [ 42 ] }
```

Note that Truffle's contract abstractions use Promises to interact with Ethereum. This can be a little cumbersome on the console, as it requires a few extra key strokes to get things done, but within your application it makes control flow a lot smoother. Additionally, take a look at the output we received: We got 42 back, but as an object. This is because Ethereum can represent larger numbers than those natively represented by Javascript, and so we need an abstraction in order to interact with them.

Quit out of the console using `Ctrl + C` (or `CMD + C` for Mac), and let's try accessing the SimpleStorage contract as node four. To do this, run the same command as before, but this time specifying the connection to node four instead of node one:

```shell
$ truffle console --network nodefour
truffle(nodefour)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
```

You'll notice we got zero back instead. This is because the accounts represented by node four weren't privy to this contract.

Lastly we can try with node seven, that *was* privy to this contract:

```shell
$ truffle console --network nodeseven
truffle(nodeseven)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '42'] s: 1, e: 1, c: [ 42 ] }
```

And as you can see, we get 42! We can now deploy contracts that are only available to our desired parties.

## 4. Interacting With Contracts Privately

So far, we've shown you how to deploy contracts that are private within your migrations. When building a dapp on Quorum, it'd also be helpful to learn how to make all transactions private.

Truffle uses its [truffle-contract](https://github.com/trufflesuite/truffle-contract) contract abstraction wherever contracts are used in Javascript. When you interacted with `SimpleStorage` in the console above, for instance, you were using a `truffle-contract` contract abstraction. These abstractions are also used within your migrations, your Javascript-based unit tests, as well as executing external scripts with Truffle.

Truffle's contract abstraction allow you to make a transaction against any function available on the contract. It does so by evaluating the functions of the contract and making them available to Javascript. To see these transactions in action, we're going to use an advanced feature of Truffle that lets us execute external scripts within our Truffle environment.

Start out by creating a file called `sampletx.js` within the root of your project. Then fill it with this code:

```Javascript
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(done) {
  console.log("Getting deployed version of SimpleStorage...")
  SimpleStorage.deployed().then(function(instance) {
    console.log("Setting value to 65...");
    return instance.set(65, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
  }).then(function(result) {
    console.log("Transaction:", result.tx);
    console.log("Finished!");
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};
```

This code does two things: First, it asks Truffle to get our contract abstraction for the SimpleStorage contract. Then, it finds the deployed contract and sets the value managed by SimpleStorage to 65, using the contract's `set()` function. As with the migration we wrote previously, the `privateFor` parameter can be appended within an object at the end of the transaction to tell Quorum that this transaction is private between the sender and the account represented by the given public key.

You can run this code using the commnad `truffle exect sampletx.js`. Your output should have looked something like this:

```shell
$ truffle exec sampletx.js
Using network 'development'.

Getting deployed version of SimpleStorage...
Setting value to 65...
Transaction: 0x0a7a661e657f5a706b0c39b4f197038ef0c3e77abc9970a623327c6f48ca9aff
Finished!
```

We can now use the Truffle console, like before, to check the results of this transaction. Let's see the value as node one:

```shell
$ truffle console
truffle(development)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '65'] s: 1, e: 1, c: [ 65 ] }
```

We got 65! Now let's do node four (not privy to the transaction):

```shell
$ truffle console --network nodefour
truffle(nodefour)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
```

We got zero, as expected. Now let's try node seven:

```shell
$ truffle console --network nodeseven
truffle(nodeseven)> SimpleStorage.deployed().then(function(instance) { return instance.get(); })
{ [String: '65'] s: 1, e: 1, c: [ 65 ] }
```

And we got 65 again, as we should expect. We can now use Truffle's contract abstractions to make private transactions with Quorum.

## Is that all Truffle can do?

Absolutely not! What we've shown you today is everything that makes building dapps for Quorum different than building dapps for the public Ethereum network. And what you'll see is it's not different at all: The only difference is adding the `privateFor` parameter for deployments and transactions you'd like to keep private. The rest is the same! In fact, now that you have the basics, you can explore [all our other resources](/docs) for building dapps with Truffle, including [tutorials](/tutorials), [documentation](/documentation), [writing advanced deployment scripts](/docs/getting_started/migrations), [unit testing](/docs/getting_started/javascript-tests) ([with solidity too](/docs/getting_started/solidity-tests)), and much more.

By building with Truffle, you now have access to not only the best development tools and technologies (like Quorum), but you also have access to the largest Ethereum developer community around. Don't hesitate to [drop us a line](https://gitter.im/ConsenSys/truffle) or [get help from the community](https://gitter.im/ConsenSys/truffle). There's always someone available to answer any questions you have.

Cheers, and happy coding!
