# TestRPC is now Ganache CLI

Have you been looking for the TestRPC recently and haven't been able to find anything about it?

Don't worry, it's still here! It's just now known as **Ganache CLI**. You can get it here:

```shell
npm install -g ganache-cli
```

## A little history

Prior to the existence of the TestRPC, one would have to deploy to a test network like Ropsten in order to see how your contract operates. The TestRPC solved that issue by providing a local blockchain where you could test your smart contracts without even needing to wait for your transactions to be mined into a block. 

While initially under the auspices of the [EthereumJS project](https://github.com/ethereumjs/), it was designed by the Truffle team from the beginning, and today we remain its primary architect.

So bringing the TestRPC under the wing of the Truffle project just made sense.

Separately, we have been hard at work on a new, graphical blockchain application called [Ganache](/ganache). This provided many of the same features as the TestRPC, but in a more user-friendly graphical format. In fact, Ganache used the TestRPC under the hood so much that the two tools are really versions of the same thing.

Which explains the name change. With Ganache being a much catchier name (and a much tastier one too), it just made sense to retire the name "TestRPC".

Aside from the name change, not much else has changed. The command line utility is still available via NPM and the [command line flags](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) are the same too. All that's changed is the name of the command.

So if you're looking for a blockchain that's perfect for beginners and anyone who wants a graphical environment, check out [Ganache](/ganache). And if you want the familiar command-line interface, install Ganache CLI. Happy developing!
