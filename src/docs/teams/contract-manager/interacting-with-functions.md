---
title: Teams | Interacting with functions
layout: docs.hbs
---

# Interacting with functions

Please note this section of the documentation assumes that you have already deployed a contract and navigated to the contract manager. If you have not done so, please take a look at the <a href="/docs/teams/contract-manager/contract-manager-overview">Contract manager overview</a> for more details.

To interact with a function, click on a function signature from the list of functions within the **Functions** section. If the function accepts parameters, you'll see an input box for each parameter. We accept valid YAML and/or JSON as inputs.

<figure class="screenshot">
  <img class="img-fluid" src="/img/docs/teams/contract-manager-02.png" title="Contract manager functions" alt="Contract manager functions" />
  <figcaption class="text-center">Contract manager functions</figcaption>
</figure>

### Working with structs as parameters

There are two different ways to input a struct as a parameter: as an array of values or as objects with the keys being the names of the struct fields.

For example, given this struct:

```javascript
struct Repository {
    string name;
    string[2] branches;
}
```

You can input the parameter as an array of values:

```javascript
["truffle-teams", ["main", "chore/update-readme"]];
```

Or you can input the parameter as an object:

```javascript
{
    name: "truffle-teams",
    branches: ["main", "chore/update-readme"]
}
```
