# TestRPC is now Ganache CLI

Have you been looking for the TestRPC recently and haven't been able to find it?

Don't worry, it's still here! It's just now known as **Ganache CLI**. You can get it here:

```shell
npm install -g ganache-cli
```

## A little history

Prior to the existence of the TestRPC, you would have to deploy to private internal test networks to see how your contract code operated (as public test networks like Ropsten didn't yet exist!).

While initially under the auspices of the [EthereumJS project](https://github.com/ethereumjs/), it was originally created by the Truffle team, and today we remain its primary maintainers.

So simply for maintainability sake, it just made sense to bring the TestRPC under Truffle's wing.

Additionally, we realized over time that the TestRPC was a poor name. The TestRPC quickly became more powerful than simply a blockchain environment used for testing. To stay with the sweet Truffle brand, we decided to rename it Ganache, as Ganache is (often) the core of your favorite chocolate truffle. It's a much catchier name (and a much tastier one too)

With this name change, we also released a fully-interactive, graphical version of Ganache which you can [find here](/ganache).

The command-line utility is still available via NPM and the [command line flags](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) are the same too. All that's changed is the name of the command.

So if you're looking for a blockchain that's perfect for beginners and anyone who wants a graphical environment, check out [Ganache](/ganache). And if you want the familiar command-line interface, install Ganache CLI. Happy developing!
