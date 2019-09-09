## Drizzle 1.5.0: A new beginning

Since the beginning, the goal of Drizzle has been to create a user experience on the frontend to make dapp development feel more like traditional web-app development. For the last two years, Drizzle has served as a managed Redux store to make interfacing with the blockchain just a little bit easier.

A few weeks ago at our annual developer conference, TruffleCon 2019, we announced several changes that will make it easier for contributors to submit PRs. These changes will allow us to have more frequent releases and will streamline the contribution process based on some pain points we discovered. 
Monorepo
Throughout these two years, we’ve developed libraries on top of Drizzle such as Drizzle-React and Drizzle-React-Components. Whenever someone makes a PR for one of these libraries, it is very often that we also need to update the other ones as well.

Since these libraries depend so heavily on each other, it only makes sense for us to move all of these packages to a monorepo to streamline any updates. Going forward, a single PR can be used to update code (and documentation) that spans multiple repos.

In addition, we now also have an experimental Vue.js plugin that fits naturally into the monorepo architecture as well. It is very likely that going forward we will develop new packages to aid the Drizzle ecosystem in this manner.

## Scoped package names

Another big change we are making is towards scoped package names on NPM. This means that instead of:

```
drizzle
drizzle-react
drizzle-react-components
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
 
And better changelogs, along with conventional commits, is something that we plan to implement going forward. It’s important to note that Drizzle wouldn’t be what it is without the open source community. A big part of why we are making all these changes is because we need you to help us make Web3 a reality together.

## Going forward

Here at Truffle, we want to make dapp development as easy as possible for our developers. We aren’t always perfect in doing that, but it’s certainly something that every member on the team passionately wants to strive towards. In the upcoming weeks, we will be doing more regular blog posts targeting the frontend space so keep an eye out!

I would also like to specifically thank Amal Sudama for his work on making this transition. It certainly couldn’t have happened without him.
