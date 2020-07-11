---
title: Teams | Starting Builds
layout: docs.hbs
---

# Starting Builds

Builds will start automatically once a new commit is pushed to any branch of a repository added to Truffle Teams. You will see the build queued in both the Truffle Teams interface on the `BUILDS` page and on GitHub with the commit itself.

![Truffle Teams DATA view](/img/docs/teams/starting-builds-01.png)

![Truffle Teams DATA view](/img/docs/teams/starting-builds-04.png)

Click on the Build to see a more detailed view with build output.

![Truffle Teams DATA view](/img/docs/teams/starting-builds-02.png)

## Restarting Builds

If for whatever reason the build failed and you want to restart a build, it is possible to manually retrigger the build by clicking `Restart Build` next to the specific build on the `BUILDS` page. Note: the `Restart Build` button will be disabled for any in progress builds or builds using an external CI provider (such as Travis or Circle) as you would have to restart the build through your external CI providers interface.

![Truffle Teams DATA view](/img/docs/teams/starting-builds-03.png)
