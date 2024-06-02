# Secure Thyself (aka The Basics)

As the saying goes _"security is only as good as the weakest link”_ so what better place to start than with securing yourself and your team. This document goes back to the basics and outlines some of the good security practices you should personally strive to implement throughout the life of your projects. Also remember that security is very much a “journey”, so be sure to revisit and reassess regularly.

## Secure your data

- Use a password manager such as [1Password](https://1password.com/) or [Bitwarden](https://bitwarden.com/) with a healthy amount of entropy for the generated passwords
- If any of the aforementioned passwords need to be shared with your team, consider a team-based version of the above. In other words, never send a password in plaintext. Oh and never share your private keys or mnemonics via any medium, period.
- Use a second factor (2FA) for all logins associated with any service used in conjunction with your dapps.
- Keep (securely stored) offline backups
- Use a hardware wallet, such as a Ledger or Trezor, for important accounts 
- Encrypt your hard drive. This is inbuilt into most modern operating systems and is easy to set up. Ensure you backup your recovery key safely.
- Keep your software up-to-date, your OS patched, etc

## Working with secrets

- During the life of your projects it’s likely you will be using secrets, such as private keys or mnemonics, as part of certain workflows. Create and use a separate account when doing this (with the necessary amounts of test currency) to avoid costly mistakes 
- When deploying your contracts to public networks, tools like [Truffle Dashboard](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/) allow you  to keep your keys in a wallet like [Metamask](https://metamask.io/), which in turn allows you to use your hardware wallet(s)
- Use dotfiles and environment variables as an alternative, but be careful with how you manage these. Using [.gitignore](https://git-scm.com/docs/gitignore) files is a viable option to stop these being committed inadvertently
- Where possible use multi-signature wallets, such as [Gnosis Safe](https://gnosis-safe.io/), for team-based transactions

## Secure your workflow

- Irrespective of your role, you’re going to be establishing a number of workflows (most likely leveraging 3rd party services) between the members of your team.  Recognize that each of these introduces additional attack surfaces to your project and should never be blindly trusted. Think about the implications if a given service were to be compromised
- Adopt the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) when granting permissions to users, processes, or 3rd party systems to ensure they can “access only the information and resources that are necessary”

## Trust but verify

- Be prepared to scrutinize any form of external contribution to your project(s), however seemingly small. For example, in the case of contributions to your code, changes to dependencies or core elements of your codebase could easily inject something malicious
- The same goes for 3rd party collaborators with whom you have limited working history, and by extension, limited trust. As outlined in the next section, scams can come in many forms

## If it’s too good to be true...

- Discord and Twitter are full of people masquerading as others/friends/celebrities who will offer you free mints/airdrops and all manner of enticements to make you send ETH or do funky approvals with all your tokens. As always, if it sounds too good to be true, it most certainly is
- Taking this one step further, it’s arguably sensible to turn up your “skepticism radar” to its highest setting with all your online interactions. Phishing attempts have gotten steadily more creative / advanced as the space has evolved and new patterns of attack are emerging daily
