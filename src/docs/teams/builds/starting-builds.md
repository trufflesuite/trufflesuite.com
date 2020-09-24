---
title: Teams | Starting builds
layout: docs.hbs
---

# Starting builds

Builds will start automatically once a new commit is pushed to any branch of any repository added to Truffle Teams. The build will be queued in both Truffle Teams and on GitHub with the commit itself. To see the build as it progresses, click on **<span class="inline-menu-item"><i class="fal fa-tasks"></i>BUILDS</span>**.

<p class="alert alert-info">
<strong>Note</strong>: Truffle Teams will only build repositories who have a Truffle project at the root of the repository. It looks for a <code>truffle-config.js</code> or <code>truffle.js</code> config in the root directory before building. Read more in the <a href="/docs/teams/reference/configuration#repository-structure">Configuration docs</a>.
</p>

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-01.png" alt="Build in progress" style="width: 100%">
</figure>

<figure>
  <img class="mb-2" src="/img/docs/teams/starting-builds-04.png" alt="GitHub build status">
</figure>

For more details on a specific build, feel free to click on **<span class="inline-button"><i class="far fa-clipboard-list-check"></i> BUILD DETAILS</span>** for any build in the list.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-02.png" alt="Details of build in progress" style="width: 100%">
</figure>