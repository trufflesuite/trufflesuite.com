# Removing Installation Issues, con't: TestRPC

<p class="alert alert-info">
**Update**: Since this blog post was published, we have released [Ganache](/ganache) a personal blockchain and a replacement to the TestRPC. We have left this post unaltered, but we highly recommend checking out our [Working with Ganache](/docs/ganache/using) page.
</p>

If you've been following along, you'll know that we recently [removed most if not all installation issues from Truffle](/blog/how-were-making-installation-issues-a-thing-of-the-past). For us it was a pretty big deal: Installation issues were, by far, the number one issue plaguing new users on any platform. We thought our solution was novel, so we blogged about it, and the biggest reaction we received from users was, "This is awesome, thank you! But can you do it for the TestRPC too?" Well you asked, and today we delivered.

The [TestRPC](https://github.com/ethereumjs/testrpc) has always been the sister application to Truffle, and for good reason. The TestRPC gives users a personal blockchain with which to develop, drastically lowering the barrier to entry of Ethereum development and removing the need for mining or dealing with real Ether. Developing on the TestRPC is an integral part of every Ethereum project, and it's usually the first blockchain deployed to in a professional Ethereum developer's workflow. We'll be blogging about the ideal Truffle workflow a bit later, but instead of waiting, you can just let [Chris Hitchcott from Digix Global show you how it's done](https://youtu.be/SFW6W-DIdIo?t=1079). (Thank you Chris, this was a great presentation.)

Fixing installation issues on the TestRPC required the [very same solution](/blog/how-were-making-installation-issues-a-thing-of-the-past) as fixing them on Truffle, so we won't go into detail here. However, I will say the solution worked _even better for the TestRPC_ than it did for Truffle. This is because the bundle we were able to create didn't require any external dependencies, making the package that you install just a single download. When compared to the old installation, the experience is night and day.

## Getting the new version

Like Truffle, we need you to put this version through its paces before we can release it as an official version, so we've **released it in beta**.

To get the beta version, first uninstall the version of the TestRPC you currently have (because they'll conflict):

```
$ npm uninstall -g ethereumjs-testrpc
```

And now install the beta version:

```
$ npm install -g ethereumjs-testrpc@beta
```

(If you're on a Unix-based system, you may have to prefix the above commands with `sudo`.)

You'll notice that the beta version installs instantly, quicker than you can say, "Holy crap, this is awesome."

## So what's next?

We have a lot of things planned for the TestRPC. We're not ready to officially announce everything just yet, but know that solving these installation issues is a stepping stone to providing you the best Ethereum development experience possible. Like creamy ganache filling is to a chocolate truffle, so is the TestRPC to the core of your workflow. So stay tuned. It's gonna be sweet.

-- Tim & the Truffle Team
