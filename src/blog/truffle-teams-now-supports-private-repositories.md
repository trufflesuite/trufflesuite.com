Thanks to the awesome work of [@nicholasjpaterno](https://github.com/nicholasjpaterno), you can now integrate private repositories with Truffle Teams! This will eventually be a premium feature, but we're releasing it for free while the product is still in beta.

## Using Private Repos

<figure>
  <img src="/img/blog/truffle-teams-now-supports-private-repositories/tt-private-repo-badge.png" alt="Example of Truffle DB" style="width:100%; box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.25);">
  <figcaption>Here we see the lock icon denoting a private repository and an indication of this being a future premium feature.</figcaption>
</figure>

There are no extra steps to use your private repositories with Truffle Teams! Simply [add your repo](https://github.com/apps/truffle-teams), and automatic builds should start working! Private repos will have a lock icon next to their name indicating their private status. Otherwise, they have the same functionality as public repos.

You'll see that we're very loud about which features will be premium. We'll continue this practice for future premium features so that we stay transparent about what's to come.

## Next Up: Deployments!

Here's a teaser of our next upcoming feature: Graduated Deployments.

<figure>
  <img src="/img/blog/truffle-teams-now-supports-private-repositories/tt-deployments.png" alt="Example of Truffle DB" style="width:100%; box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.25);">
  <figcaption>The main deployments screen showing successful testnet and mainnet deployments.</figcaption>
</figure>

You'll be able to deploy any commit with a successful build to Ropsten, Rinkeby, and Mainnet Ethereum networks (with more to come soon!). You'll get some useful contextual information for your deployments: the status of the deployment, when it took place, who on your team deployed it, the contracts deployed, the ability to download your Truffle Artifacts, and more.

Deploy to the Staging environment (Ropsten and Rinkeby currently) to make sure everything works out. Once you're ready, you can easily graduate a deployment in Staging to Production (Mainnet currently). We're using `truffle migrate` under the hood, so your existing migration scripts will work just fine.

We've distilled the deployment process into an informative and helpful wizard to guide you through the deployment process. With this wizard and leveraging [MetaMask](https://metamask.io) for signing transactions, we are finally giving you an interface that makes it easier to deploy for seasoned and new devs alike!

We'll release a full article with all the details about using Truffle Teams' deployment features once it's ready for release.

Thank you and happy truffling!