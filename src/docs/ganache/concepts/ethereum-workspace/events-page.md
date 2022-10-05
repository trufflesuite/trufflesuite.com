---
title: Events Page
layout: docs.hbs
---
# Events Page

The new events page shows the events that have fired during this chain's life. We'll try to decode the events if possible. A decoded event will show its name, the emitting contract, hash of the transaction it appears in, log index, and block time. Encoded events will not display decoded names (they appear instead with the generic name `Encoded Event`) or contract names.

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Why aren't my events being decoded?</strong> Check and make sure you've added the corresponding Truffle project with the contract that defines that event.
</p>

![Events Page](/img/docs/ganache/v2-shared-seese/events.png)

Clicking a decoded contract will reveal more information about the event including its return values and signature.

![Event Details](/img/docs/ganache/v2-shared-seese/event-details.png)
