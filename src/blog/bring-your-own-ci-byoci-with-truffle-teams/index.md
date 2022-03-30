---
title: Bring Your Own CI (BYOCI) with Truffle Teams

---

Truffle Teams has always offered an internal continuous integration (CI) service. This service is great for getting up and running quickly since it requires no configuration to run your Truffle tests.

We also want to support teams who have established CI setups outside of Truffle Teams. Thanks to the fantastic work by [Erin Shaben](https://github.com/eshaben), **you can now leverage your existing GitHub-integrated build services**!

## Using an Existing CI Service

<figure>
  <img class="mb-4 figure-shadow" src="/img/blog/bring-your-own-ci-byoci-with-truffle-teams/figure-1.png" alt="Builds settings screen" style="width:100%">
  <figcaption class="text-center font-italic">The BUILDS settings screen</figcaption>
</figure>

Enabling external CI for a repository only requires a single checkbox! Navigate to your user or organization’s settings page by clicking the user/org icon in the navbar. From there, click the BUILDS tab, then check the checkbox next to the repository of your choice!

<figure>
  <img class="mb-4 figure-shadow" src="/img/blog/bring-your-own-ci-byoci-with-truffle-teams/figure-2.png" alt="Build with external CI enabled" style="width:100%">
  <figcaption class="text-center font-italic">Build with external CI enabled</figcaption>
</figure>

Now, when you navigate to the builds page for that repository, any new builds will show a list of your GitHub-integrated build services, along with their respective statuses.

For more detailed information on the external CI service, [check out our documentation here](/docs/teams/builds/external-ci).

For more detailed information on adding services to GitHub via their Marketplace, [check out the GitHub Marketplace docs here](https://help.github.com/en/github/customizing-your-github-workflow/about-github-marketplace).

## Future Integration

We want Truffle Teams to be the most effective devops tool in the blockchain space for both new and existing teams. Let us know what you think about this integration solution, and if your team has other needs we haven’t met yet.

Thanks!

Josh Quintal

-- Head of Product & Marketing, Truffle Suite