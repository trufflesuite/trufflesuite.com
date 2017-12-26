# TestRPC is now Ganache

Have you been looking for the TestRPC recently and haven't been able to find it?

Don't worry, it's still here! It's just now known as **Ganache**.

Ganache comes in two flavors: a fully-interactive development blockchain with a graphical interface, and the more familiar command-line version.

* [Get the graphical version here](/ganache).

* For the command-line version (known as **Ganache CLI**):

  ```shell
  npm install -g ganache-cli
  ```

## A little history

Prior to the existence of the TestRPC, you would have to deploy to private internal test networks to see how your contract code operated (as public test networks like Ropsten didn't yet exist!).

While initially under the auspices of the [EthereumJS project](https://github.com/ethereumjs/), it was originally created by the Truffle team, and today we remain its primary maintainers. So simply for maintainability sake, it just made sense to bring the TestRPC under Truffle's wing.

Additionally, we realized over time that the TestRPC was a poor name. The TestRPC quickly became more powerful than simply a blockchain environment used for testing. To stay with the sweet Truffle brand, we decided to rename it Ganache, as Ganache is (often) the core of your favorite chocolate truffle. It's a much catchier name (and a much tastier one too).

## Multiple ways to enjoy

With this name change, we also released [a fully-interactive, graphical version of Ganache](/ganache).

The command-line utility is still available via NPM; the [command line flags](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) are the same too. All that's changed is the name of the command.

Ganache is also available as a library for your applications. See the [README](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) for more details.

So now you have multiple ways to create a personal blockchain. If you're looking for a blockchain with a graphical environment that's perfect for beginners, check out [Ganache](/ganache). And if you want the familiar command-line interface, install Ganache CLI. Happy developing!
