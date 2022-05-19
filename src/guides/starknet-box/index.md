---
title: Building for StarkNet with Truffle
hide:
  - navigation
---

# Building for StarkNet with Truffle

Written by [David Killen](https://twitter.com/DavidAKillen)

## Overview

Today, we are going to lead you through deploying, and interacting with, your own ERC20 token on [StarkNet](https://starknet.io/) using Truffle's [StarkNet Box](https://github.com/truffle-box/starknet-box). If your friends and family have been incessently asking you "Wen token?", now's your chance to give it to them. To the moon!

### What is StarkNet?

StarkNet is a permissionless decentralized Validity-Rollup (ZK-Rollup). StarkNet operates as a Layer 2 network over Ethereum, enabling any dApp to achieve unlimited scale for its computation – without compromising Ethereum’s composability and security.

### The Cairo Language

StarkNet Contracts are written in Cairo. Cairo is a programming language for writing provable programs, that is, a program where one party can prove to another that a certain computation was executed correctly. Cairo and similar proof systems can be used to provide scalability to blockchains. StarkNet uses the Cairo programming language both for its infrastructure and for writing StarkNet contracts. More information about StarkNet and Cairo, including some tutorials, can be found in the [StarkNet and Cairo documentation](https://starknet.io/docs/index.html).

## Introducing the StarkNet Box

In this guide, we will use Truffle's new StarkNet Box. The StarkNet Box is a proof of concept box. The box has been built with the intention of better understanding StarkNet development and exploring how StarkNet development can be supported by Truffle. Further detail about using the StarkNet Box can be found in [StarkNet Box GitHub repository](https://github.com/truffle-box/starknet-box).

### What's in the Box?

The StarkNet Box gathers together several tools and resources that are necessary and helpful in developing for StarkNet. These tools are provided in two Docker images which the StarkNet Box will pull from a Docker Hub repository if necessary. First, the box provides a command line interface for compiling, deploying, testing and interacting with your contracts. Second, the box includes the [OpenZeppelin Cairo contracts](https://github.com/OpenZeppelin/cairo-contracts) library to help in developing StarkNet contracts and the [pytest](https://docs.pytest.org/en/7.1.x/index.html) library for writing and running unit tests. The StarkNet Box also makes use of the [StarkNet Devnet Docker image](https://hub.docker.com/r/shardlabs/starknet-devnet) to provide a StarkNet network for development testing. 

## Prerequisites

### System Requirements

At the very least, you will need the following to use the StarkNet Box:

- [Node.js](https://nodejs.org/) 14.18.2 or later
- [NPM](https://docs.npmjs.com/cli/) version 6.14.15 or later
- [Docker](https://docs.docker.com/get-docker/), version 20.10.10 or later
- Recommended Docker memory allocation of >=8 GB.
- Windows, MacOS or Linux

**Important Note:** The scripts included in the StarkNet Box rely on Docker being available and running. On Linux you may need to have Docker configured to [run the Docker daemon in 'rootless' mode](https://docs.docker.com/engine/security/rootless/).

### Docker

The StarkNet Box relies heavily on Docker. All the tools used in developing StarkNet contracts are supplied in two Docker images. For this reason, you must have Docker installed to use the StarkNet Box.
## Set Up the Project

### Unboxing the StarkNet Truffle Box

### Configuration Files

## StarkNet Accounts

### Deploying an Account Contract

### Funding the Account

### StarkNet Wallets

## The ERC20 Contract

## Compiling the ERC20 Contract

## Testing the ERC20 Contract

## Deploying the ERC20 Contract

### Strings in StarkNet Contracts

### Deploying to StarkNet Devnet

### Deploying to StarkNet Alpha Goerli

## Interacting with the ERC20 Contract

### StarkNet Voyager

### Minting Tokens

### Transferring Tokens

## Final Notes

1. [Truffle's StarkNet Box](https://github.com/truffle-box/starknet-box)
1. [StarkNet](https://starknet.io/)
1. [OpenZeppelin Cairo Contracts](https://github.com/OpenZeppelin/cairo-contracts)
1. [OpenZeppelin Contracts Wizard for Cairo](https://wizard.openzeppelin.com/cairo)