<style>
    .md-typeset table:not([class]) {
        background-color: var(--md-primary-fg-color);
    }
</style>

# Command palette

Truffle for VSCode provides several commands for interacting with ledgers, and building, compiling,
and testing your smart contracts.
These features are enabled through the command palette and several right-click shortcut menus.

To access the command palette, select **View, Command Palette** from the VSCode menu, or press
`ctrl+shift+p`.

## Commands

| Command name                    | Description                                                                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Truffle: Build Contracts`      | Builds/compiles all contracts in the `contracts` directory.                                                                                                                                                                                                                |
| `Truffle: Deploy Contracts`     | Deploys a smart contract to a local Ganache network, or a public Ethereum network.                                                                                                                                                                                         |
| `Truffle: New Solidity Project` | Scaffolds out a basic (default) smart contract folder structure. Includes simple contract (`.sol`), Truffle config files and GitHub readiness (e.g., `README`). You can choose to unbox a Truffle box to get access to specific examples hosted by Truffle.                |
| `Truffle: Start Ganache Server` | Starts a local Ethereum emulator - Truffle's Ganache command line server ([Ganache-cli](https://github.com/trufflesuite/ganache-cli/blob/master/README.md)). This server allows developers to deploy contracts to a local network which emulates a public blockchain node. |
| `Truffle: Stop Ganache Server`  | Stops the local Ganache Ethereum emulator.                                                                                                                                                                                                                                 |
| `Truffle: Show Welcome Page`    | Opens the default Welcome Page which contains simple examples and links to online resources specific to Truffle for VSCode.                                                                                                                                                |

## Right-click shortcuts

| Command name                | Context                                                                  | Description                                                                |
| --------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `Copy Access Key`           | Right-click on your Blockchain Service Node.                             | Inserts the access key for your node into the copy/paste buffer.           |
| `Copy Contract ABI`         | Right-click on contract `.json` after compiling.                         | Copies the contract ABI into your copy/paste buffer.                       |
| `Copy Contract Bytecode`    | Right-click on contract `.json` after compiling.                         | Copies the contract Bytecode into your copy/paste buffer.                  |
| `Copy RPC Endpoint Address` | Right-click on your Node.                                                | Inserts the RPC endpoint address for your node into the copy/paste buffer. |
| `Deploy Contracts`          | Right-click on your contract `.sol` or contract `.json` after compiling. | Deploys your contract to the selected destination.                         |
