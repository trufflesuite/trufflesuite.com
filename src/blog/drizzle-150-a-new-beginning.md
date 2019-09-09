<figure>
  <img src="/img/blog/drizzle-150-a-new-beginning/sunrise.jpg" alt="Sunrise landscape" style="width:100%">
  <figcaption style="text-align: center;">_The dawn of a new era for regular releases and a better contributor experience_</figcaption>
</figure>

Since the beginning, our goal here at Truffle has been to make dapp development as easy as it can be. To this end, Drizzle was created by Josh Quintal two years ago as a managed Redux store to make interfacing with the blockchain just a little bit easier.

And now in 2019 at our annual developer conference, TruffleCon 2019, we announced several changes to Drizzle that will make it easier for users and contributors alike to work closely with us for a better dapp building experience.

## From many to one

Today, we are announcing that we are moving to a monorepo. And now, a single PR can be used to update code (and documentation) that used to span multiple repos.

Over the last two years, we’ve developed libraries on top of Drizzle such as `drizzle-react` and `drizzle-react-components`. Since these libraries depend so heavily on each other, it only makes sense for us to move all of these packages to a monorepo to streamline any updates.

In addition, we now also have an experimental Vue.js plugin that fits naturally into the monorepo architecture. It is very likely that going forward we will develop new packages to aid the Drizzle ecosystem in this manner.

## Scoped package names

Another big change we are making is towards scoped package names on NPM. This means that instead of:

```
drizzle
drizzle-react
drizzle-react-components
drizzle-vue-plugin
```

We will now have:

```
@drizzle/store
@drizzle/react-plugin
@drizzle/react-components
@drizzle/vue-plugin
```

From an organizational standpoint, this makes it a lot more intuitive to manage your dapp development.

## Testing

Prior to the monorepo, testing our libraries together was a slow, error-prone and painful experience. Our maintainers had to build custom dapps to isolate changes and manually link packages together as well as coordinate with ganache for each front end. The monorepo allows us to have dedicated front end apps that automatically build against the latest libraries and we can conveniently orchestrate starting them with a single ganache instance.



## A regular release cadence

Perhaps the biggest thing that the two changes above allow us to move towards is a more frequent release cadence. In the past year, we often had to deal with delaying the publishing of a new change because it required changes and testing other repos. This was inefficient because our publishing process was essentially being blocked by having to synchronize changes amongst our multiple repos.

With a monorepo that all changes, and we have a unified approach for ease of development. This means more regular releases and faster turnaround time getting issues fixed.

## Contributor focus

A better onboarding experience for contributors is one of the goals we have for Drizzle. And that means having better testing guard rails. In the new monorepo, you can easily spin up three apps to test various aspects of the monorepo in just one command.

<figure>
  <img src="/img/blog/drizzle-150-a-new-beginning/test-ui.png" alt="Test UI instances" style="width:100%">
  <figcaption style="text-align: center;">_Easily spin up real frontends to test that dapps can work with the current code_</figcaption>
</figure>
 
And better changelogs, along with conventional commits, is something that we plan to implement going forward. It’s important to note that Drizzle wouldn’t be what it is without the open source community. A big part of why we are making all these changes is because we need you to help us make Web3 a reality together.

## Going forward

Here at Truffle, we want to make dapp development as easy as possible for our developers. We aren’t always perfect in doing that, but it’s certainly something that every member on the team passionately wants to strive towards. In the upcoming weeks, we will be doing more regular blog posts targeting the frontend space so keep an eye out!

I would also like to specifically thank Amal Sudama for his work on making this transition. It certainly couldn’t have happened without him.
