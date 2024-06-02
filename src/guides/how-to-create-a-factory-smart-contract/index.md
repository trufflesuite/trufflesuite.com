# How to create a Factory Smart Contract

Form XChange is a dApp with which we create forms and send feedback. Each feedback form is a Smart Contract created by a Factory Smart Contract. The Factory Contract executes a function that creates an instance of our template contract (the feedback form smart contract).

For this app we’ll use:

- Solidity
- Truffle
- Linea
- Typechain

## Installing Truffle globally

First, what’s truffle?

> **Truffle** is a world-class development environment, testing framework and asset pipeline for blockchains using the **Ethereum** **Virtual Machine (EVM)**, aiming to make life as a developer easier.
> 

In our case, we use it to compile and deploy our smart contracts on Linea's Tesnet.

We will start by installing **Truffle** globally using the command:

```
npm install -g truffle
```

After having finished the installation of Truffle, to create the folder structure we need, we will execute the following command at the root of our project:

```
truffle init
```

This way, you’ll have the following folder structure:

```
.
├── contracts           <-- solidity contracts live here
├── migrations          <-- migration scripts live here
├── test                <-- tests (Solidity and JS) live here
└── truffle-config.js   <-- truffle configuration file
```

## Creating the template Smart Contract

We will start by creating our contract template using Solidity, this is a smart contract like any other. It will store the information on our forms (questions, answers, the owner, etc).

```solidity
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

contract FeedbackForm {
    struct Question {
        string value;
        uint[] feedback;
    }

    uint private numberOfQuestions;

    address public owner;
    string public title;
    string public description;

    mapping(uint => Question) public questions;
    mapping(address => bool) public feedbackProviders;

    constructor(string memory _title, string memory _description) {
        owner = tx.origin;
        title = _title;
        description = _description;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "Only owner can call this function."); // tx.origin is the address of the sender of the transaction
        _;
    }

    modifier hasProvidedFeedback() {
        require(!feedbackProviders[tx.origin], "User has already prvoded feedback.");
        _;
    }

    function getHasProvidedFeedback(address _address) public view returns (bool) {
        return feedbackProviders[_address]; // returns true if the address has already provided feedback
    }

    function setQuestions(string[] memory _questions) public onlyOwner {
        numberOfQuestions = _questions.length; // save the number of questions in the form
        for (uint i; i < numberOfQuestions; i++) {
            Question memory question;
            question.value = _questions[i];
            questions[i] = question;
        }
    }

    function getQuestionById(
        uint _id
    ) public view onlyOwner returns (string memory, uint[] memory) {
        return (questions[_id].value, questions[_id].feedback); // returns the question and the feedback for that question
    }

    function getAllQuestions()
        public
        view
        returns (Question[] memory)
    {
        Question[] memory allQuestions = new Question[](numberOfQuestions);
        for (uint i; i < numberOfQuestions; i++) {
            allQuestions[i] = questions[i];
        }
        return allQuestions; // returns all the questions in the form
    }

    function submitFeedback(
        uint[] memory _feedback
    ) public hasProvidedFeedback {
        require(
            numberOfQuestions == _feedback.length,
            "Feedback should be provided for all questions."
        ); // check if the feedback is provided for all questions
        for (uint i; i < _feedback.length; i++) {
            Question storage question = questions[i];
            question.feedback.push(_feedback[i]); // save the feedback for each question
        }
        feedbackProviders[msg.sender] = true; // save the address of the feedback provider
    }
}
```

## Creating the Factory Smart Contract

After having our template contract we can create the Factory Contract.

### But first, what is Factory Pattern?

> A factory contract refers to a smart contract that can create, track and modify the state of its created contracts. There are several uses cases of why you may want to implement a factory contract. For example, if your deployment pipeline involves re-deploying the same contract, you can utilize the factory pattern to keep track of these contracts and save on gas fees.
**Source**: [here](https://www.quicknode.com/guides/other-chains/polygon/how-to-create-and-deploy-a-factory-erc-1155-contract-on-polygon-using-truffle/)
> 

> The factory contract is deployed once from the off-chain source code. The factory may contain the definition of multiple smart contracts. Factory contract is analogous to a *class* in an object-oriented programming. Every transaction that generates a smart contract instance essentially instantiates an object of the factory contract class. This contract instance (the object) will maintain its own properties independently of the other instances but with a structure consistent with its original template.
**Source**: [here](https://research.csiro.au/blockchainpatterns/general-patterns/contract-structural-patterns/factory-contract/#:~:text=Factory%20contract%20is%20analogous%20to,of%20the%20factory%20contract%20class.)
> 

Now, let's create our factory contract!

First, we will import our template contract into our factory contract:

```solidity
import "./FeedbackForm.sol";
```

Then we create an array that stores all our feedback forms addresses:

```solidity
FeedbackForm[] public feedbackForms;
```

We create a function that creates an instance of our FeedbackForm and we add the title, description, and questions. It will also add our instance to our feedbackForms array.

```solidity
function createFeedbackForm(
        string[] memory _questions,
        string memory _title,
        string memory _description
    ) public returns (FeedbackForm) {
        FeedbackForm feedbackForm = new FeedbackForm(_title, _description);
        feedbackForm.setQuestions(_questions);
        feedbackForms.push(feedbackForm);
        return feedbackForm;
    }
```

In this way, our Factory Contract would already be fulfilling its function of creating feedback forms. Now we will add some other functions that allow us to interact with our forms. Our factory contract would look like this:

```solidity
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "./FeedbackForm.sol";

// FeedbackFormFactory creates an instance of our FeedbackForm and adds it to our feedbackForms array
contract FeedbackFormFactory {
    FeedbackForm[] public feedbackForms; // array that stores all our feedback forms addresses
    function createFeedbackForm(
        string[] memory _questions,
        string memory _title,
        string memory _description
    ) public returns (FeedbackForm) {
        FeedbackForm feedbackForm = new FeedbackForm(_title, _description);
        feedbackForm.setQuestions(_questions);
        feedbackForms.push(feedbackForm);
        return feedbackForm; 
    }

    function getFeedbackForms() public view returns (FeedbackForm[] memory) {
        return feedbackForms; // returns all the feedback forms
    }

    function getFeedbackFormById(uint _id) public view returns (FeedbackForm) {
        return feedbackForms[_id]; // returns the feedback form with the id _id
    }

    function getAllQuestions(
        uint _id
    ) public view returns (FeedbackForm.Question[] memory) {
        return feedbackForms[_id].getAllQuestions(); // returns all the questions in the feedback form with the id _id
    }

    function submitFeedback(uint _id, uint[] memory _feedback) public {
        feedbackForms[_id].submitFeedback(_feedback); // submits the feedback for the feedback form with the id _id
    }
}
```

## Deploying our factory Smart Contract to Linea

We will install dotenv using npm

```
npm install dotenv
```

Then we will go to the truffle-config.js file where we will add the networks we will be working with. But first, we create a .env file where you will store your MNEMONIC (your wallet seed phrase). The .env should look like this:

```
MNEMONIC=your_mnemonic
```

Now we import dotenv and our mnemonic into the truffle.config.js file.

```jsx
require("dotenv").config();
const mnemonic = process.env["MNEMONIC"]; // your wallet seed phrase
```

Now we create an instance of an HD Wallet using truffle. But first, what is an HD wallet?

> Hierarchical Deterministic Wallets (HD Wallets) are a type of crypto wallet that provides a scheme to generate Bitcoin (or any other cryptocurrency) addresses from a seed phrase.
> 

```jsx
const HDWalletProvider = require("@truffle/hdwallet-provider"); 
```

Now we add the necessary configuration to connect to Linea Test Network

```jsx
module.exports = {
  networks: {
    linea: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc.goerli.linea.build`),
      network_id: 59140,
      chain_id: 59140,
    },
  },
};
```

Our truffle.config.js should look like this:

```jsx
require("dotenv").config();
const mnemonic = process.env["MNEMONIC"];

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 9545,
      network_id: "5777",
      chain_id: 1337,
    },
    linea: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc.goerli.linea.build`),
      network_id: 59140,
      chain_id: 59140,
    },
  },
  mocha: {
    timeout: 100000,
  },
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
```

Now, we will configure our migrations.

> Migrations are deployment scripts that allow you to alter the state of your contracts on the blockchain. Essentially, they are a way to deploy smart contracts on the Ethereum network.
> 

For this we will go to the /migrations folder and create the file 1_deploy_contracts.js, there we will add the following code:

```jsx
const FeedbackFormFactory = artifacts.require("FeedbackFormFactory"); // imports our factory contract

module.exports = async function (deployer) {
  await deployer.deploy(FeedbackFormFactory);
};
```

The `artifacts.require()` method is similar to Node's `require`, but in our case it specifically returns a contract abstraction that we can use within the rest of our deployment script.

Finally, we install TypeChain in our project to be able to generate types for our contracts.

```
npm install typechain
```

This way we would have everything ready to deploy our factory contract to Linea's Testnet. But first, we must create the scripts that will be in charge of deploying our contract. This would look like this:

```json
"scripts": {
    "compile": "truffle compile",
    "migrate:local": "truffle migrate --network development",
    "migrate:linea": "truffle migrate --network linea",
    "generate-types": "typechain --target=truffle-v5 'build/contracts/*.json'",
    "dev": "npm run compile && npm run generate-types && npm run migrate:local",
    "linea": "npm run compile && npm run generate-types && npm run migrate:linea"
  },
```

Now everything is ready to interact with our factory contract!

You can find the Form XChange app repository here: [GitHub](https://github.com/ConsenSys/Form-XChange/tree/main/packages/form-XChange)
