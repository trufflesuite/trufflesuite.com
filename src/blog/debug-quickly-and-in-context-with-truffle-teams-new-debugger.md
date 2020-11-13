![Truffle Teams Debugger Banner](/img/blog/debug-quickly-and-in-context-with-truffle-teams-new-debugger/blog-header.png)

If you’ve used Truffle’s debugger, you know it’s best-in-class. Until now though, it’s been confined to the command line. Today the debugger breaks out of the console to a GUI within Truffle Teams! This is a huge workflow enhancement--allowing us to debug transactions in the places we’re already viewing--via the deployment details screen or while monitoring individual contracts. Let’s take a look!

<p class="alert <meta name=">
  <i class="fas fa-info-circle"></i> <strong>Note</strong>: To use the debugger right away, you’ll need to opt-in to [Truffle Teams Early Access](#).
</p>

## Launching the Debugger

To launch the debugger, we just need to find a transaction. Head over to the Deployments screen and select a deployment. From there select the transactions tab or click the monitoring button for a contract. You’ll notice there’s a debug button on each transaction card; clicking it will open the Truffle Teams debugger.

<figure>
  <img class="mb-4 w-100 figure-shadow" src="/img/blog/debug-quickly-and-in-context-with-truffle-teams-new-debugger/deployments-refresh-1.png" alt="The new deployments table view">
  <figcaption class="text-center font-italic">Debugging is only a click away!</figcaption>
</figure>

## Navigating the UI

Starting at the top, you’ll see the transaction hash along with an icon noting its status and, if applicable, the accompanying error message (1). Below that we have our functions, from left to right: Step Next, Step Over, Step In, Step Out, and Reset (2). Next we have some tabs showing the contracts included in this transaction (3). Finally we have two panes, one showing our Solidity with the current step highlighted in yellow (4). The second with our variables (4).

<figure>
  <img class="mb-4 w-100 figure-shadow" src="/img/blog/debug-quickly-and-in-context-with-truffle-teams-new-debugger/deployments-refresh-1.png" alt="The new deployments table view">
  <figcaption class="text-center font-italic">Debugging is only a click away!</figcaption>
</figure>

At the moment some other enhancements, including breakpoints and syntax highlighting, are coming soon. We wanted to get this powerful feature in your hands as quickly as possible, so we’re releasing it now via Early Access. For more information on what to expect from early access, check out [the Truffle Teams Early Access blog post](#).

For more information, check out [the Truffle Teams Debugger docs](#) or for general information about Truffle’s debugger, check out [the Truffle Debugger docs](#).

## Continue the Conversation

We want Truffle Teams to be the most effective DevOps tool in the blockchain space for both new and existing teams. Let us know what you think about the new deployment views, or if your team has other needs we haven’t met yet.

Continue the conversation with your fellow Trufflers in our Slack community!

<div class="mt-12 text-center">
  <a class="btn btn-truffle mt-3" href="https://join.slack.com/t/truffle-community/shared_invite/zt-8wab0bnl-KcugRAqsY9yeNJYcnanfLA" target="_blank">SIGN UP FOR THE TRUFFLER SLACK</a>
</div>

Thanks!

_Josh Quintal, Head of Product & Marketing_
