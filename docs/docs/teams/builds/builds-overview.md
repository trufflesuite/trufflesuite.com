---
title: Teams | Builds overview
layout: docs.hbs
---

# Builds overview

At it's core, Truffle Teams is a zero-configuration Continuous Integration (CI) platform that aims to support your development lifecycle. Any time code is pushed to a repository with Truffle Teams enabled, we automatically build and test code changes. As the build progresses, we provide you status updates and build output.

When a build is run with Truffle Teams, we spin up a virtual environment and run a series of commands such as installing Truffle, cloning your repository, installing dependencies for your repository and more. To check out exactly what commands we run, check out the build output for any build by going to **<span class="inline-menu-item"><i class="fal fa-tasks"></i>BUILDS</span> > <span class="inline-button"><i class="far fa-clipboard-list-check"></i> BUILD DETAILS</span>**.

To learn how to trigger a build, check out the <a href="/docs/teams/builds/starting-builds">Starting builds</a> section for more information.

If you want or need a customizable CI solution, you can use an external CI provider such as Travis or Circle. For more information on how to set up an external provider, head over to our <a href="/docs/teams/builds/external-ci">External CI</a> documentation.
