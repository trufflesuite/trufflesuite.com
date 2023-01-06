# WCGW (aka What Could Go Wrong)?

There are many things that can go wrong in software development and dapps are no different. If anything, given the public nature of the blockchain networks and the amounts of value at stake, the risks are often higher than with previous computing paradigms. So the short answer to #WCGW is a LOT.

Mitigating the risks starts with understanding what they are so let’s dive right in. Thematically we’ve broken them down into the following five areas:

- Interface considerations 💻
- Smart Contract vulnerabilities 🔐
- Human factors 🤦‍♀️
- 3rd Party Code 📝

## Interface considerations 💻 

A dapp’s interface is often overlooked as an attack vector, but there’s a number of considerations and more subtle vulnerabilities that should very much be on your radar. 

- **Denial of Service** - Quite simply this is when a malicious actor renders your service (your dapp’s front-end in this case) inaccessible to users. While the implications may not be as severe as other types of attacks, at a minimum it’s an inconvenience and could significantly damage your credibility in the eyes of users. If you’re hosting your front-end central via a provider such as Cloudflare they have a number of prevention mechanisms built-in. Conversely if you’re choosing to host it decentrally via IPFS (or equivalent) then you’ve got some more intrinsic protection given its decentralized nature
- **Hosting provider account compromise** - However this happens (password leakage, social engineering, etc) this is a potentially catastrophic issue. As highlighted in the [BadgerDAO’s exploit post mortem](https://badger.com/technical-post-mortem) an attacker was able to inject a malicious script into the transaction which “prompted users to allow a foreign address approval to operate on ERC-20 tokens in their wallet.” In other words, users were inadvertently allowing the attacker to transfer assets out of their wallets. Mitigations for this really just come down to hardened environment security as highlighted in the [Security Harden ALL The Things](./harden-all-the-things) section
**DNS/DNSLink hijacking** - In a similar manner to that of a hosting provider compromise, a DNS/DNSLink hijack enables an attacker to direct users to a  malicious version of your front-end with equally catastrophic results Suddenly everyone thinks they are using your contract (via the fake front-end) when they are in fact sending funds to the hackers account
**Fake / spoofed front-ends** - If you’re lucky enough to have your dapp grow in popularity, then there’s a reasonable chance you’ll start to see malicious copycats emerge (often with subtle variations on the domain name). To a large degree this is out of your control, although you could notify your users via social channels and create an Issue / PR on Metamask’s [​​eth-phishing-detector](https://github.com/MetaMask/eth-phishing-detect) which maintains a list of malicious domains

## Smart Contract vulnerabilities 🔐 

This is of course the big one and will be covered in more depth in the next section, but to give you a flavor of the types of vulnerabilities let’s look at a few infamous hacks from over the years.

- **The DAO hack (Reentrancy Attack)** - An early, and sadly ill-fated, attempt at a DAO (Decentralized Autonomous Organization) wherein what’s now known as a “reentrancy attack” was exploited to drain nearly $150m of the DAO’s treasury. Chainlink has a [great post mortem](https://blog.chain.link/reentrancy-attacks-and-the-dao-hack/), with example code, if you want to dig in further. 
- **Wormhole Bridge Hack (Improper Input Validation)** - A failure to properly validate input enabled an attacker to spoof “guardian” accounts and mint the equivalent of $320m in wrapped ETH. A summary by [Elliptic](https://www.elliptic.co/blog/325-million-stolen-from-wormhole-defi-service)
- **Parity Multisig Wallet hack (Fallback Function Delegatecall to Library)** - Another infamous hack on an early multisignature wallet implementation wherein the attacker was able to make themselves the “owner” via a vulnerability in a shared library used by the wallet’s contract implementation. [Technical deep dive](https://hackingdistributed.com/2017/07/22/deep-dive-parity-bug/)
- **Hospowise Token Burn (Incorrect Access Control)** - Incorrect access control on a ERC20 token implementation enabled an attacker to burn tokens held by any address, including ones they didn’t own. This allowed them to do just that for the tokens held by Uniswap pools thus increasing inflation (and thus the token’s value which they subsequently exchanged back to ETH) until the pool was exhausted. [More](https://blog.solidityscan.com/access-control-vulnerabilities-in-smart-contracts-a31757f5d707)

## Human factors 🤦‍♀️ 

According to a 2013 study by IBM, human factors were cited as the cause of 95% of the security breaches analyzed. While Dapps have considerably different risk profiles to more “traditional” applications and services, the human factor should not be underestimated. Let’s take a look at some of the common pitfalls.

- **Social Engineering** - If a hacker can impersonate you or steal your credentials/sim/mobile phone number porting then it's quite probable that you're going to have all your passwords compromised and any personal information could be leaked or used for their advantage/gain. If they can login to your social media accounts then it's quite easy for them to then dupe people into sending information to them thinking that it's you they are speaking to
- **You inadvertently commit private keys to your source control** - If you commit a public key to a public source control repo. You are more than likely to have had that account drained within 24hrs if it had anything of value in it. People have bots that scan all the commits into Github et al looking for mnemonics/private keys/ssh keys etc constantly. If those accounts controlled or owned some smart contracts online. Well yeah, ditto
- **Your passwords are leaked/using common passwords** - If your favourite password is pastebinned from some site that got hacked along with your email address then, again, most likely some automated hackerman script kiddie is going to try it across a number of different sites and platforms to see if they get a hit/access. If they do, yeah, big trouble
- **You Get Ransomware’d (new word)** - Your computer gets hacked/ransomware. Not much to say on this, if that happens it’s a real problem. If you have good backups and strong passwords you could be ok but you have to figure out how things like that have happened

## 3rd Party Code 📝

- **Supply chain hack** - Some nice person makes a commit/pr to your repo and they change the package lock file for NPM or YARN. Only thing is, instead of bumping that package that had all the bugs in it to the latest version on NPM, they changed the lock file to point to their hacked version on github instead. Or, they made a typo-like name and published it onto NPM. Now you're suddenly running hacked code and if that's doing something like injecting new scripts onto your website or changing the code that sends to your web3 wallet to sign transactions… In this case, you might be signing all your ERC20 stablecoins away to a hacker to drain from your wallet and not buying that super cool NFT you wanted
  - [Wired has a really good article](https://www.wired.com/story/github-code-signing-sigstore/) explaining the risk opensource projects face with hackers posing as legitimate contributors who inject malicious code into these packages used by 100’s of other projects
