# Security Harden ALL The Things 

So you’re ready to start writing code? Hold on just one moment! Building on “[Secure thyself (aka the basics)](/secure-thyself)”, here are some important practices to begin establishing your project’s security posture and get it off to a secure footing. 

## Assemble your (virtual) security team

- Wherever possible find a trusted forum in which you can share your ideas and get input on your code (high-level design, choice of tools, libraries, etc). This is particularly important as your project begins to grow in complexity. And just to be clear. This doesn’t mean asking for advice on Reddit or Stack Overflow or public forums. If you do, you need to understand the risks associated with doing so. Try to find one or two people you really trust and have experience and work with them if at all possible
- Budget permitting, bug bounties (via platforms such as [Immunefi](https://immunefi.com)) can be a great way to incentivise people to work on your codebase for a reward/payment
- Depending on what’s at stake (and your budget), you might also want to consider getting your code audited by a 3rd party to surface the more subtle issues / attack vectors that you might have missed. If you do decide to go this route, note there can be a sizable lead time so reach out to prospective auditors early. Also consider a [TURN Token](https://consensys.net/blog/diligence/smart-contract-auditing-with-turn-token/) if you’re short on time and want to jump the line

## Secure your environments

- In CI/CD environments there are many ways to secure these values and it's outside the scope of this to list them all. Be very wary of keeping private keys, etc on CI servers even as secured keys
- Use version control and only commit/build/deploy code from tested source code
- Consider keeping repos private
- Be very careful with commit history and what you commit. Remember, once it’s on Github, it’s very hard to remove it and even if you do, it will most likely have been indexed and harvested/analyzed before you can run a history rewrite script to remove it
- Ensure you don’t commit secrets to public repositories and have your information harvested
- Consider using anonymous commits in Github to obfuscate your git details
- Use a [good git ignore file](https://www.toptal.com/developers/gitignore) to not commit any environment or dotfiles you are using in your project
Be aware of attack vectors such as [supply chain hacks](https://www.crowdstrike.com/cybersecurity-101/cyberattacks/supply-chain-attacks/)

## Prepare to test, test, and test some more

- Testing your code often and in an automated way can give you some level of comfort that your code will behave the way you intend it to. With the caveat that behaviour can only be guaranteed by the test cases
- There are many facets to testing:
  - Testing your code at a unit level, low level functionality is tested in isolation
  - Testing your code's behaviour at a higher level. Does it perform this function with these params as I intend?
  - And sometimes something in between. Searching for edge cases you know could be problematic
  - There are other testing methodologies you can use like fuzzing: https://docs.scribble.codes
  - Load and Automated Testing. These are more likely to be considerations for a front end/DAPP more than smart contract code but should definitely be considered
- Most of these testing ideas are across the board, from your solidity code, deployment scripts and the actual front end dapp you will write to interface with them
- Test your deployments work as expected. Also test what happens when you want to run updates or subsequent deployments/fixes
- Ensure your deployment platform/provider is secure and is resilient enough to handle attacks

## Prepare to monitor

- Security is a journey, not a destination. You can’t just do security once and then forget about it, things change, new exploits are coming out weekly. You need to monitor your site and code for possible issues
- You also need to know how your application is behaving. Look at tools to watch the logs of your smart contract and or the web application to ensure they are working properly
- Use a dashboard tool to analyse/collate this information for your smart contract
- Tools like [OpenZeppelin's Defender](https://www.openzeppelin.com/defender) try to do this as an all in one solution and are worth looking at

## Plan for worst case scenarios

While it might seem pessimistic, modelling worst case scenarios will allow you to start thinking about mitigations early in the project’s life (vs a panicked response when the SHTF). It will also help you sleep at night if you’re lucky enough to have your project moon 🚀
