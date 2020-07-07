![Filecoin Collab Banner](/img/blog/announcing-collaboration-with-filecoin/blog-header.png)

Today we're announcing an exciting new collaboration, aimed at helping developers across the globe create and deploy fully decentralized applications. We've teamed up with Filecoin to add support for the Filecoin network into our world class suite of tools. In typical Truffle fashion, we'll beef up the Truffle command line tool to give you everything you need to deploy directly to Filecoin; and then we'll add new features to Ganache so that you can easily simulate the Filecoin network during development and testing.

### The Decentralized Ideal

Since Truffle's inception, we've long wanted to integrate with decentralized storage networks so we can help developers build fully decentralized applications. For the most part, this has been a waiting game: Decentralized storage networks have been in heavy development, and it's clear these technologies needed time to mature. With Filecoin's month-long hackathon starting [this week](https://hackfs.com/), and the launch of their main network ("mainnet") coming later this summer, we thought now was the right time to give developers access to this amazing new technology.

We're excited about Filecoin because it allows developers to build applications with 100% uptime. For instance, if an application uses only fully-dentralized technologies like Etheruem and Filecoin, the built-in incentivizations of those technologies will ensure miners around the world will keep that application running. With anti-censorship properties, as well as support for large amounts of data, Filecoin support could bring in a new age of Web3. 

There's a lot we have to do before we reach this ideal, but I'd love to tell you about our roadmap for the next six months. 

### Truffle Preserve: Save Your App Data (available today!)

![Truffle Preserve](/img/blog/announcing-collaboration-with-filecoin/truffle-preserve.gif)

In thinking about our support for Filecoin, the idea of *preservation* came quickly to mind. We envisioned that preserving application data like Javascript frontends and static assets would be a normal part of the deployment process. So we ran with that idea and added a new command to the Truffle command line tool: `truffle preserve`.

Like preserving fruit, Truffle follows a "recipe" to preserve your files. In the gif above, Truffle is using the `filecoin` recipe, which will ship standard with our new version of Truffle. 

**You can use `truffle preserve` today!** You'll need to download a special release we created so you can start testing, shown below. Note that our Filecoin integration is very alpha, but we wanted to support all the amazing devs hacking on Filecoin this month during [HackFS](https://hackfs.com/). 

```
$ npm install -g truffle@preserves
```

To use `truffle preserve`, simply specify the files you want to preserve on the command line, and choose between the `--filecoin` or `--ipfs` recipes. The `filecoin` recipe uses the `ipfs` recipe under the hood. You can choose only the `ipfs` recipe if you have a different set up!  

```javascript
// Preserve to Filecoin:
$ truffle preserve ./path/to/directory --filecoin

// Preserve to IPFS only:
$ truffle preserve ./path/to/directory --ipfs 
```

By default, `truffle preserve` comes configured to work with the [Powergate localnet](https://docs.textile.io/powergate/localnet/), though you can change the IPFS and Filecoin connection information by adding the following to your `truffle-config.js` file: 

```javascript 
  // ...,
  environments: {
    development: {
      "ipfs": {
        address: "http://localhost:5001"
      },
      "filecoin": {
        address: "ws://localhost:7777"
      }
    }
  },
```

Note that this configuration adds a new top-level `environments` object. We'll be using this new configuration object as we upgrade to Truffle 6 in the future.

### Filecoin-flavored Ganache: Simulate Filecoin (Summer/Fall/Winter)

Ganache was built as the sister application to Truffle, to speed up development and testing Ethereum applications. Now that we've added support to Truffle, it's only natural we provide the same highly-modular simulator for Filecoin. Over this summer and into Fall, we plan to create a Filecoin simulation library, as part of [`ganache-core`](https://github.com/trufflesuite/ganache-core). Then later on this Fall/Winter, we'll follow that up with support in our graphical version of Ganache, below! 


![Filecoin-flavored Ganache](/img/blog/announcing-collaboration-with-filecoin/filecoin-flavored-ganache.png)

### Get involved / Reach out!

We're extremely excited to be working with the Filecoin team and adding support for Filecoin into Truffle's tooling. If you have questions about our Filecoin integration or our plan for the future, <a href="https://trfl.co/become-a-truffler" target="_blank">join our slack community</a> and get your questions answered. Whether you're a new dev or a [HackFS hacker](https://hackfs.com/), we're happy to help. 
