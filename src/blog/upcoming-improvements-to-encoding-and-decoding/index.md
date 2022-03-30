---
title: Upcoming improvements to encoding and decoding

---

When you’re writing, running, or debugging your smart contract, you don’t want to have to deal with raw binary data. Truffle––and Ganache and Drizzle––already contain a number of encoding and decoding features to help you interact with your contract and understand what you’re seeing. But luckily, encoding and decoding are about to become even more robust, informative, and usable.

Not all of these features will be immediately available in Truffle 5.1, but some will, so let’s start with one that will be ready! Allow me to illustrate:

![Syntax Highlighting](/img/blog/upcoming-improvements-to-encoding-and-decoding/syntax-highlighting.png)

Yes, debugging displays are about to become quite a bit more colorful! And though it’s not related to decoding, yes that is `syntax highlighting` in the debugger! Of course, it’s not just a matter of color. Previously, many data types displayed inappropriately as strings, and enums displayed as objects. Now, each data type will be displayed in a form (and color) that makes sense, making them recognizable at a glance. No longer will a function be confused for a string!

![Contracts and External Functions](/img/blog/upcoming-improvements-to-encoding-and-decoding/contracts-and-external-functions.png)

Of course, this wouldn’t be possible without our new, more machine-readable, decoder output format. This one’s a little technical, and it’s not something you’re likely to find yourself dealing with directly -- you probably aren’t using Truffle Decoder directly. But Ganache and Drizzle both make use of it, and as they update to incorporate the new format, you’ll be able to get a better view of the state of your contracts with them.

But that’s not all; we’re also intending to eventually integrate these encoding and decoding features into Truffle Contract. This will allow you to send transactions and decode events that you currently can’t!

For instance, Vyper contracts support decimal fractions as a datatype, but our current encoder and decoder, and the ethers library, do not support these. If you want to send a transaction (or if your contract emits an event) that takes a decimal fraction as input, you are going to run into trouble. With our upcoming encoding and decoding improvements, this should no longer be a problem. (Or, for something of more concern to our Solidity users, the same applies to external function pointers.)

Finally, I’d like to discuss decoding of events. Currently, when you check what events your contract may have emitted recently, you may have trouble decoding events emitted by libraries. Our new decoder, though, will be able to handle these just fine. It will even handle anonymous events! That may seem impossible, but hey, that hasn’t deterred us.

We’re hoping Truffle’s new encoder and decoder will make staring at raw binary data a thing of the past! Unless you like to, of course. But for those of you who’d prefer to take a higher-level view and deal directly with what that binary data actually means… well, that’s what Truffle’s for, isn’t it?

