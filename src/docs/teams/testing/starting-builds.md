---
title: Teams | Starting Builds
layout: docs.hbs
---

# Starting Builds

Builds will start automatically once a new commit is pushed to any branch of a repository added to Truffle Teams. You will see the build queued in both the Truffle Teams interface on the `BUILDS` page and on GitHub with the commit itself.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-01.png" alt="Build in progress" style="width: 100%">
</figure>

<figure>
  <img class="mb-2" src="/img/docs/teams/starting-builds-04.png" alt="GitHub build status">
</figure>

Click on the Build to see a more detailed view with build output.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-02.png" alt="Details of build in progress" style="width: 100%">
</figure>

## Restarting Builds

If for whatever reason the build failed and you want to restart a build, it is possible to manually retrigger the build by clicking `Restart Build` next to the specific build on the `BUILDS` page. Note: the `Restart Build` button will be disabled for any in progress builds or builds using an external CI provider (such as Travis or Circle) as you would have to restart the build through your external CI providers interface.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-03.png" alt="Successful build" style="width: 100%">
</figure>
