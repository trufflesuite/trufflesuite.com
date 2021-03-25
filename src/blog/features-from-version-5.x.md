Truffle version 5.2.x and features you may have missed in 5.1.x



Intro
More flexible compilation
pragma compilation
compilation of abi.json files
Test & Debugging Enhancements
Solidity stacktraces in Truffle Test
Debugging verified external contracts
Vyper Enhancements
Experimental Vyper debugging
Improved import handling in Vyper
Enumeration values in Truffle Contract objects

In this blogpost we will go over some of the features included in version 5.2.x of Truffle as well as some features that you may have missed in 5.1.x. To illustrate some of these features we have created a Truffle box. You can unbox it using the unbox command in an empty directory as follows: `truffle unbox https://github.com/truffle-box/v5.2-example-box`.

Pragma compilation


As of version 5.2.0, Truffle now ships with a fun, new experimental setting for compilation: the “pragma” setting. This feature analyzes your Solidity source files for their pragma expressions. It then uses these expressions to figure out which version of the Solidity compiler is required for each given source. This allows your project to compile when it contains multiple Solidity files, each requiring a different version of the Solidity compiler!

To use this feature, set the Solidity compiler version field in your `truffle-config.js` as follows:
```javascript
module.exports = {
  compilers: {
    solc: {
      version: “pragma”
    }
  },
  // … the rest of your config goes here
};
```
Now you can run `truffle compile` and your project will compile!

In the example box referenced above, you can see how the `truffle-config.js` is set up to use this new experimental feature. Notice that `contracts/MetaCoin.sol` requires `^0.7.0` and how `contracts/Conversion.sol` requires `^0.7.0`. When running `truffle compile` on this example project you should get a printout of all the versions of the Solidity compiler used during compilation. Namely, you should see that both version `0.6.12` and `0.7.6` are listed.

As mentioned above, when you use this feature, Truffle will analyze each or your Solidity sources one by one to find the appropriate version of the Solidity compiler for each source. Do note, however, that each source file and all of its imports must be compiled with one version of Solidity; this means there must be a version of the compiler that satisfies all of their pragma expressions.




Things you may have missed in Truffle 5.1
We’ve added a fair bit over the course of Truffle 5.1 as well, and there’s a good chance you didn’t catch all of it!  We thought this would be a good time to review some of that as well!


Compilation of abi.json files

Another exciting addition to Truffle is the ability to compile from a contract’s ABI. When you create a JSON source file in your “contracts” directory that contains a contract’s ABI, Truffle will take it, use it to create an interface, and compile it. This might come in handy, for example, when you want to import and use a library that requires a different version of the Solidity compiler than the importing file. You can then simply compile the library and create a new JSON file containing the ABI of the imported library. Under the hood Truffle will compile the ABI into a Solidity interface and create an artifact for it. You will then be able to import the interface into your contract!

In the v5.2-example-box, consider the `contracts/MetaCoin.sol` and `contracts/Conversion.sol`. We would like to import Conversion into the MetaCoin contract to use it but cannot since they require different versions of the Solidity compiler.  To work around this, we have created `contracts/IConversion.abi.json` which contains the ABI from the compiled Conversion. In this way we can now import the interface into `contracts/MetaCoin.sol` (see line 4 in the MetaCoin contract) to use it!
Solidity stacktraces in Truffle Test
Try running your tests with the `--stacktrace` option (or `-t`) for short and get combined Solidity-Javascript stacktraces!  This feature does have some limitations and is still somewhat experimental, but we expect you’ll find it quite useful.  In the future we may add support for Vyper stacktraces as well!  And speaking of Vyper…
Experimental Vyper debugging
You can now use Truffle Debugger with Vyper!  Support for this is still in its early stages; you won’t be able to inspect variables, I’m afraid.  But you can step through a Vyper transaction, and there will likely be more in the future!

But perhaps the biggest improvement to the debugger is…
Debugging verified external contracts
Use the `--fetch-external` (or `-x` for short) option with Truffle Debugger and it will automatically download sources for any verified contracts and allow you to step through them!  Contracts can be verified on either Etherscan or Sourcify.  You no longer need to download these yourself and add them to your Truffle project!  You can see [this](add URL here) earlier post for more information.
Improved import handling in Vyper
Here’s another one for our Vyper users; you can now do imports from other projects (via NPM or EthPM) just like in Solidity!

For instance, suppose `examplepackage` is an NPM package which is structured as a Truffle project, and you want to import a Vyper contract `VyperContract` from it.  You can now do

```
from examplepackage.contracts import VyperContract
```
or
```
import examplepackage.contracts.VyperContract as VyperContract
```
to import it, much like you could do in Solidity!

Note that if your own project uses such “absolute” imports as a way to import its own files from the project root -- e.g., if you have a file `contracts/subdirectory/Contract1.vy` which imports `contracts/Contract2.vy` via
```
import Contract2 as Contract2
```
then this will work within your own project, but won’t work if other people try to import your `Contract1`.  We suggest that if you want other people to import contracts from your project, you use explicitly relative imports instead:
```
from .. import Contract2
```
But such imports are now possible.  We hope you’ll find all sorts of uses for this!
Enumeration values in Truffle Contract objects
When sending a transaction that takes an `enum`, it’s inconvenient to have to look up the numeric constants that the `enum` uses.  Well, now, each Truffle Contract constructor object contains enumeration constants, so you don’t need to do that.  Just do
```
contractInstance.exampleMethod(Contract.ExampleEnum.EnumValue)
```
and don’t worry about the particular numeric value of `EnumValue`.  You can also do `Contract.enums.ExampleEnum.EnumValue`, if you want to be extra-certain.

Note that it’s not currently possible to access enums declared outside of a contract this way, but we have plans in the future to make using those easier, too!
Even more!
Other things you might have missed include: Improved event decoding in `truffle test`; being able to use the debugger to step through Yul (assembly) sources generated by Solidity for its own internal subroutines (try the `g` command!); being able to inspect assembly variables in the debugger; `truffle test --bail`; `truffle create all`; and the debugger providing more information upon transaction reversion.

We’re always adding more… so be on the lookout for it!
How are you liking Truffle?
What do you think of the new enhancements in Truffle?

We want Ganache to be the most effective development blockchain in the space. Let us know what you think about this feature, and if your team has other needs we haven’t met yet.

Thanks!
