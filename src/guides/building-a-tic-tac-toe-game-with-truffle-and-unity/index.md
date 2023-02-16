---
title: Building a Tic Tac Toe Game with Truffle and Unity
hide:
  - navigation
---

# Building a Tic Tac Toe Game with Truffle and Unity

Written by [Josh Quintal](https://twitter.com/OnlyOneJMJQ)

Last updated 2/15/2022

# Overview

Unity is a powerful game engine.
Truffle is a powerful smart contract framework.
Let's combine both to make something cool!

This tutorial focuses on using Truffle and Unity together while assuming you have a basic knowledge of both tools. For getting started materials with Truffle and Unity, [see here](#).

<aside class="alert alert-info"><strong>Want to skip to the finished game?</strong> Use our Truffle Box by running `truffle unbox tic-tac-toe` and opening the created directory in Unity.</aside>

## Contents

1. Prerequisities
2. Writing the Game's Smart Contract
3. Testing the Game's Smart Contract
4. Creating the Tic Tac Toe Game
5. Adding Web3 Functionality
6. Next Steps

# Prerequisities

We'll need a few things to get started:

- Truffle
- Unity
- Truffle Plugin for Unity

# Writing the Game's Smart Contract

Here's the complete smart contract. We'll break it down in sections to understand exactly what's happening.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/PullPayment.sol";

contract TicTacToe is PullPayment {
  event GameStarted(uint game_id);
  event GameWon(address winner, uint amount);

  struct Game {
    uint jackpot;
    address[2] payout_addresses;
    bool ended;
  }

  Game[] games;

  address[] public winners;
  mapping(address => uint) public leaderboard;

  function startGame(address payout_x, address payout_o) public payable {
    // must have some value attached for jackpot
    require(msg.value > 0, "jackpot must be greater than 0");

    // all params must be supplied
    require(payout_x != address(0), "player X address cannot be empty");
    require(payout_o != address(0), "player O address cannot be empty");

    // msg.sender and payout_o cannot be the same address
    require(payout_x != payout_o, "player X and player O cannot have the same payout address");

    uint new_game_id = games.length;
    address[2] memory payout_addresses = [msg.sender, payout_o];
    games[new_game_id] = Game(msg.value, payout_addresses, false);

    emit GameStarted(new_game_id);
  }

  function endGame(uint game_id, uint winner) public {
    // make sure the game hasn't already ended
    require(!games[game_id].ended);

    address winner_address = games[game_id].payout_addresses[winner];
    uint jackpot = games[game_id].jackpot;

    games[game_id].ended = true;

    _asyncTransfer(winner_address, jackpot);

    emit GameWon(winner_address, jackpot);
  }

  function getWinners() public view returns(address[] memory) {
    return winners;
  }
}
```

## Imports and Variables

```solidity
import "@openzeppelin/contracts/security/PullPayment.sol";

contract TicTacToe is PullPayment {
  event GameStarted(uint game_id);
  event GameWon(address winner, uint amount);

  struct Game {
    uint jackpot;
    address[2] payout_addresses;
    bool ended;
  }

  Game[] games;

  address[] public winners;
  mapping(address => uint) public leaderboard;
```

We import OpenZeppelin's PullPayment contract for safe processing of withdrawals for the winner. In Ethereum a best practice is to have users withdraw funds rather than sending them automatically.

We have 2 events: GameStarted, which fires when a game starts, and GameWon, which fires when a game ends in a win. If a game ends in a draw, it will not fire this event because nothign related to the smart contract needs to occur.

Each game is represented by a Game struct. It has a jackpot amount supplied by the user, an array containing the addresses of the players (X & O), and a boolean letting us know if this game has ended.

We keep an array of Games so that we can quickly access them by ID, which in this case is their index in the games array.

Finally, we have an array of addresses for winners and a mapping of addresses to integers. We use these in conjunction to efficiently build the leaderboard. Mappings in Ethereum contain all possible IDs, so in order to get only the relevant addresses, we keep track of them in the array so that we can pass them to the mapping accessor.

## Starting a Game

```solidity
function startGame(address payout_x, address payout_o) public payable {
  // must have some value attached for jackpot
  require(msg.value > 0, "jackpot must be greater than 0");

  // all params must be supplied
  require(payout_x != address(0), "player X address cannot be empty");
  require(payout_o != address(0), "player O address cannot be empty");

  // msg.sender and payout_o cannot be the same address
  require(payout_x != payout_o, "player X and player O cannot have the same payout address");

  uint new_game_id = games.length;
  address[2] memory payout_addresses = [payout_x, payout_o];
  games[new_game_id] = Game(msg.value, payout_addresses, false);

  emit GameStarted(new_game_id);
}
```

To start a game, we need to know the jackpot amount (supplied as `msg.value`) and the address of the players involved for payout. We check that those values are set and that the two payout addresses are not equal. Our contract assumes a "game master" will setup the game and deposit the necessary jackpot funds, which then get paid out to the winner. We then get the ID for our new game which, thanks to using an array, is the current length.

We then pass these varialbes into a new Game object and emit our `GameStarted()` event.

## Ending a Game

```solidity
function endGame(uint game_id, uint winner) public {
  // make sure the game hasn't already ended
  require(!games[game_id].ended);

  address winner_address = games[game_id].payout_addresses[winner];
  uint jackpot = games[game_id].jackpot;

  games[game_id].ended = true;

  _asyncTransfer(winner_address, jackpot);

  emit GameWon(winner_address, jackpot);
}
```

To end a game, we first make sure the game we're attempting to end hasn't already been ended. This single line is supremely important. Because this is a smart contract hosted on a public blockchain, anyone could call this contract outside of the game. Becasuse of this, we check our game's state to make sure this can't be used to potentially trigger unlimited withdrawals.

We then add the winner's address to the winners array so that we can efficiently build the leaderboard.

From there we get the winner's address and the jackpot so that we can call `_asyncTransfer()`. This function comes from the OpenZeppelin contract we imported and it handles the payouts for us. The winner can now call a payout function to withdraw their funds safely. In the case that this player has won multiple times, this function will automatically aggregate their winnings.

Finally we emit out `GameWon()` event.

## Accessor Function

Many types in Solidity come with accessor functions by default, but in the case of dynamically-sized arrays, we can only access a single index at a time unless we write our own acccessor.

```solidity
function getWinners() public view returns(address[] memory) {
  return winners;
}
```

This function loads the entire array into memory so we can pull it into the frontend with a single call. This will help us build our leaderboard.

# Testing the Game's Smart Contract

Now that we've written our smart contract, it's time to test! Here's the entire test file, which we'll then break down:

```javascript
const TicTacToe = artifacts.require("TicTacToe");
const truffleAssert = require("truffle-assertions");

contract("TicTacToe", (accounts) => {
  // PRE-START

  it("should not start a new game without a jackpot", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    await truffleAssert.reverts(
      ticTacToeInstance.startGame(accounts[0], accounts[1]),
      "jackpot must be greater than 0"
    );
  });

  it("should not start a new game with an empty payout_x address", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    await truffleAssert.reverts(
      ticTacToeInstance.startGame(
        "0x0000000000000000000000000000000000000000",
        accounts[1],
        { value: 100 }
      ),
      "player X address cannot be empty"
    );
  });

  it("should not start a new game with an empty payout_o address", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    await truffleAssert.reverts(
      ticTacToeInstance.startGame(
        accounts[0],
        "0x0000000000000000000000000000000000000000",
        { value: 100 }
      ),
      "player O address cannot be empty"
    );
  });

  it("should not start a new game with 2 equal payout addresses", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    await truffleAssert.reverts(
      ticTacToeInstance.startGame(accounts[0], accounts[0], { value: 100 }),
      "player X and player O cannot have the same payout address"
    );
  });

  // HAPPY PATH

  it("should start a new game with all parameters supplied", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    const tx = await ticTacToeInstance.startGame(accounts[0], accounts[1], {
      value: 100,
    });

    truffleAssert.eventEmitted(tx, "GameStarted");
  });

  it("should end a game if one exists", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    const tx = await ticTacToeInstance.endGame(0, 0);

    truffleAssert.eventEmitted(tx, "GameWon");
  });

  it("should allow withdrawal if an address has winnings", async () => {
    const ticTacToeInstance = await TicTacToe.deployed();

    const oldBalance = accounts[0].balance;
    await ticTacToeInstance.withdrawPayments(accounts[0]);
    const newBalance = accounts[0].balance;

    assert.equal(
      oldBalance,
      newBalance,
      "winner balance changed an unanticipated amount after withdrawal"
    );
  });
});
```

# Creating the Tic Tac Toe Game

# Adding Web3 Functionality

# Next Steps
