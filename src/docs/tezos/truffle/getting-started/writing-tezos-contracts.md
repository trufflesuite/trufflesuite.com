---
title: Writing Tezos Contracts
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Writing Tezos Contracts

Smart contracts in Tezos are written in the [LIGO programming language](https://ligolang.org/). We recommend you familiarize yourself with the language before continuing. Their documentation is excellent.

* [Main language site](https://ligolang.org/)
* [Online sandbox](https://ide.ligolang.org/)
* [Documentation](https://ligolang.org/docs/intro/introduction/)

<p class="alert alert-warning">
<strong>Note!</strong> LIGO supports three different syntaxes out of the box: CamelLIGO, PascalLIGO, and ReasonLIGO. For all examples in this documentation, we use PascalLIGO.
</p>

## Example Contract & Overview

All contracts within a Tezos-based Truffle project are stored in the `./contracts` directory. An example contract looks like the following:

```
// variant defining pseudo multi-entrypoint actions
type action is
| Increment of int
| Decrement of int

function add (const a : int ; const b : int) : int is a + b

function subtract (const a : int ; const b : int) : int is a - b

// real entrypoint that re-routes the flow based on the action provided
function main (const p : action ; const s : int) : (list(operation) * int) is 
  ((nil : list(operation)),
    case p of
    | Increment (n) -> add (s, n)
    | Decrement (n) -> subtract (s, n)
    end)
```

There's some important takeaways to note when writing LIGO contracts: 

* By default, all LIGO contracts have a single entry point called `main`, expected by Truffle. For multiple entry points, see below. 
* The last parameter to the entry point function represents the current state of the contract, and is sent to the function via the underlying protocol. 
* All LIGO contracts return two things: A list of further operations the protocol should perform, and the final state of the contract after execution of the entry point.

## Defining Multiple Entry Points

You'll notice that the comments in the example contract above suggest there are multiple entry points beyond `main()`. Conceptually there _are_ multiple entry points -- `increment` and `decrement` -- but under the hood, `main()` is technically the single entery point of the contract. 

To code a contract with multiple entry points that Truffle can take advantage of, you'll need to follow the example above. Start by defining an enum-like type called `action` with values relative to the functions being called, and then pass the action as the first value into `main()`. As you'll see in the [Interacting With Your Contracts](/docs/tezos/truffle/getting-started/interacting-with-your-tezos-contracts) section, if Truffle detects an `action` type as the first parameter in `main()`, it'll treat your contract as though it has multiple entry points, and make those entry points easy to call from outside the blockchain.

## Including Other Contracts

Sometimes it's nice to organize your code in multiple files. Fortunately, the LIGO compiler does this for you. To do so, check out the [LIGO documentation](https://ligolang.org/docs/advanced/include/) for more. You'll still need one contract that contains a `main()` function, though you can organize other contract code in other files as needed.

## How do I compile? 

It's easy. See the [Compiling Tezos Contracts](/docs/tezos/truffle/getting-started/compiling-tezos-contracts) section for more! 
