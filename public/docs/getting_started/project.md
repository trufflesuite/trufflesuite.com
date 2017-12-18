# Creating a project

To use most Truffle commands, you need to run them against an existing Truffle project. This section will show you how to create a new project.

For those just getting started, we have many boilerplates and example applications available to you through [Truffle Boxes](/boxes). 

You can start with our MetaCoin example by running the following on the command line:

```shell
mkdir MetaCoin
cd MetaCoin
truffle unbox metacoin
```

See the project structure as shown at the bottom of this page.

<p class="alert alert-info">
<strong>Note</strong>: The MetaCoin Truffle project used to be created by running `truffle init`. Now it exists as a [Truffle Box](/boxes/metacoin).
</p>

You can use the `truffle unbox <box-name>` command to download any of the other applications.

If you'd prefer to start from scratch, create a project directory and move into it. You can do this through your favorite file explorer or by running the following on the command line:

```shell
mkdir myproject
cd myproject
```

Next, initialize your Truffle project by running the following command:

```shell
truffle init
```

Once completed, you'll now have a project structure with the following items:

* `contracts/`: Directory for [Solidity contracts](./contracts)
* `migrations/`: Directory for [scriptable deployment files](./migrations#migration-files)
* `test/`: Directory for test files for [testing your application and contracts](./testing)
* `truffle.js`: Truffle configuration file
