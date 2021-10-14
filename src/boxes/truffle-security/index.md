---
hide:
  - navigation
---

# Truffle Security
This is a [Truffle](http://truffleframework.com/) [Box](http://truffleframework.com/boxes/) providing the security infrastructure for your DApp backend.

It aims to be a single box that meets all your requirements to write secure solidity smart contracts and is [Solium](https://github.com/duaraghav8/Solium)'s official box for Truffle.

## Installation & Usage
- Install Truffle globally

        npm install -g truffle
<br>

- Download the box. This also takes care of installing the necessary dependencies.

        truffle unbox UtkarshGupta-CS/truffle-security
<br>

- Compile the Contracts

        truffle compile
<br>

- Deploy the compiled contracts

        truffle migrate
<br>

- Linting the Solidity Contracts

        npm run lint:sol
<br>

## Available Integrations
- [Style](http://solium.readthedocs.io/en/latest/user-guide.html#list-of-core-rules) & [Security](https://www.npmjs.com/package/solium-plugin-security#list-of-rules) linting with [Solium](https://github.com/duaraghav8/Solium)

## Roadmap
- [Zeppelin Contracts](https://github.com/OpenZeppelin/zeppelin-solidity) as dependancy
- Support for Zeppelin's [contract upgrading pattern](https://blog.zeppelin.solutions/proxy-libraries-in-solidity-79fbe4b970fd)
- Security analysis using [Oyente](https://github.com/melonproject/oyente)

## Contributions
We aim for this project to be community-governed. We therefore invite one and all to suggest improvements and features, assist us on Licensing issues, discuss the future of DApp security and contribute in any way you can!

## Maintainers
- [Utkarsh Gupta](https://github.com/UtkarshGupta-CS)
- [Raghav Dua](https://github.com/duaraghav8)

See the [Wiki](https://github.com/UtkarshGupta-CS/truffle-security/wiki) for complete documentation.
