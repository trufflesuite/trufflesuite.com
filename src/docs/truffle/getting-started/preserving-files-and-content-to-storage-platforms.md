---
title: Truffle | Preserving Files and Content to Storage Platforms
layout: docs.hbs
---
# Preserving Files and Content to Storage Platforms

## Preserving to IPFS, Filecoin or Textile Buckets

The [`truffle preserve` command](/docs/truffle/reference/truffle-commands#preserve) comes preconfigured with the ability to preserve files to IPFS, Filecoin or Textile Buckets.

### IPFS

To preserve your files to IPFS use the `--ipfs` flag.

```shell
$ truffle preserve ./path --ipfs [--environment <name>]
```

#### Configuration

By default, the connection to IPFS is done with a local node presumed to be running at `http://localhost:5001`. This is the default for an `ipfs` daemon and also for `ganache filecoin`. It is possible to point to a different IPFS node by configuing a different URL in a `truffle-config.js` environment.

```javascript
module.exports = {
  /* ... rest of truffle-config */

  environments: {
    /* ... other environments */

    production: {
      ipfs: {
        address: 'https://ipfs.infura.io:5001'
      }
    }
  }
}
```

### Filecoin

To preserve your files to Filecoin use the `--filecoin` flag.

```shell
$ truffle preserve ./path --filecoin [--environment <name>]
```

#### Configuration

By default, the connection to Filecoin is done with a local node presumed to be running at `http://localhost:7777/rpc/v0`. This is the default for a mainnet or localnet Lotus or Powergate node and also for `ganache filecoin`. It is possible to point to a different Filecoin node by configuing a different URL in a `truffle-config.js` environment. Besides the connection URL, you can also configure Filecoin storage deal options such as the duration or price.

```javascript
module.exports = {
  /* ... rest of truffle-config */

  environments: {
    /* ... other environments */

    development: {
      filecoin: {
        address: 'http://localhost:1234/rpc/v0',
        token: 'AUTH_TOKEN',
        storageDealOptions: {
          epochPrice: "2500",
          duration: 518400, // 180 days
        }
      }
    }
  }
}
```

### Textile Buckets

To preserve your files to Textile Buckets use the `--buckets` flag.

```shell
$ truffle preserve ./path --buckets [--environment <name>]
```

#### Configuration

Textile Buckets requires some configuration in order to work with `truffle preserve`. To get started, you need to install [Textile's `hub` tool](https://docs.textile.io/hub/), register and create authentication keys.

```shell
hub init
hub keys create
 - account
 - Require Signature Authentication (recommended): N
```

After generating these keys, they need to be added to an environment in your `truffle-config.js` file as well as the name of the bucket that you want to preserve your files to - it's possible to use an existing bucket for this, or if it doesn't exist yet it will be created in the process.

```javascript
module.exports = {
  /* ... rest of truffle-config */

  environments: {
    /* ... other environments */

    development: {
      buckets: {
        key: "MY_BUCKETS_KEY",
        secret: "MY_BUCKETS_SECRET",
        bucketName: "truffle-preserve-bucket",
      }
    }
  }
}
```

## Preserving with custom preserve recipes

While Truffle comes bundled with support for IPFS, Filecoin and Textile Buckets, additional workflows (or recipes) can be defined and used.

### Plugin installation / configuration

1. Install the plugin from NPM.
  ```shell
  npm install --save-dev truffle-preserve-to-my-server
  ```

2. Add a `plugins` section to your Truffle config.
  ```javascript
  module.exports = {
    /* ... rest of truffle-config */

    plugins: [
      "truffle-preserve-to-my-server"
    ]
  }
  ```

3. Add any required configuration options to your Truffle config if it's required by the plugin. Refer to the plugin's documentation for this.

### Plugin usage

After installation and configuration, the plugin's tag (e.g. `--my-server`) will show up in `truffle help preserve` and can be used with `truffle preserve`.

```shell
truffle preserve ./path --my-server
```

## Creating custom preserve recipes

Additional preserve recipes can be defined through Truffle's plugin system.

### truffle-plugin.json

To define a Truffle preserve recipe you need to create a `truffle-plugin.json` file that specifies the tag that the recipe uses (`truffle preserve --my-tag`) and the path to the recipe source module.

```javascript
{
  "preserve": {
    "tag": "my-tag",
    "recipe": "./index.js"
  }
}
```

### Recipe interface

The `@truffle/preserve` package defines a `Recipe` interface that needs to be implemented by custom preserve recipes. This includes a static `help` string, a `name` string, lists of `inputLabels` and `outputLabels`, an `execute` function, and it can optionally include a constructor. These are discussed below.

```typescript
import * as Preserve from "@truffle/preserve";

export class Recipe implements Preserve.Recipe {
  static help = "Help text about the preserve recipe";

  name = "name-of-the-recipe";

  inputLabels = ["input-label-1"];
  outputLabels = ["output-label-1"];

  configParam: number;
  constructor(options: any) {
    this.configParam = options.configParam;
  }

  async *execute(options: Preserve.Recipes.ExecuteOptions): Preserve.Process {
    return {
      "output-label-1": "Hello World!"
    };
  }
}
```

### Recipe constructor

It is possible to define a constructor for your recipe. Truffle will automatically pass any variables configured in the config file environment under the key that corresponds to the recipe's "tag" (as specified in its `truffle-plugin.json` file). E.g. when using the configuration below, the constructor for the recipe with tag `ipfs` will receive `{ address: 'http://localhost:5001' }` as its options parameter.

```javascript
module.exports = {
  /* ... rest of truffle-config */

  environments: {
    /* ... other environments */

    development: {
      ipfs: {
        address: 'http://localhost:5001'
      }
    },
  }
}
```

### Recipe dependencies
The Recipe interface contains input and output labels. The "output labels" specify the outputs that the recipe produces, while the "input labels" specify the inputs that the recipe requires.

By default, Truffle provides the `"path"` and `"config"` inputs, which are the path specified in the `truffle preserve` command and the ["Truffle config" object](/docs/truffle/reference/configuration) respectively. When specifying other inputs, the truffle preserve engine will match the specified input labels with the output labels of other installed recipes and execute these dependency recipes in order.

#### Middleware recipes

Through this system of input and output labels, it is possible to create end-user recipes, such as the `@truffle/preserve-to-buckets` recipe, but also middleware recipes that are *only* used by other recipes, such as the `@truffle/preserve-fs` recipe. Of course it is also possible to create recipes that can function as either, such as the `@truffle/preserve-to-ipfs` recipe.

### Implementing the execute function

The Recipe interface contains an `execute` function. This function gets called by Truffle when your recipe gets executed directly or as a dependency of another recipe. Because preserve plugins have to work with files and directories, this execute function is [*generator function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), meaning that it produces async iterables - or streams. This can be slightly tricky to work with, so if you haven't used them before you should read up on generators and async iterables.

#### ExecuteOptions

The `execute` function has one single object parameter with several properties as defined in the `ExecuteOptions` interface.

```typescript
interface ExecuteOptions {
  inputs: { [index: string]: any };
  controls: Controls;
}
```

##### Inputs

The "inputs" property contains a dictionary that maps from an input label to a value provided by Truffle or by dependency recipes, as discussed in the section above.
So to access the Truffle config object you need to use `options.inputs.config` and to access the provided path you need to use `options.inputs.path`. Other notable middleware recipes that truffle provides are `@truffle/preserve-fs` and `@truffle/preserve-to-ipfs`. These two recipes provide the `"fs-target"` label, and the `"ipfs-cid"` label, respectively.

###### FileSystem Target

The `"fs-target"` input conforms to the `Preserve.Target` interface, which is a structured interface to represent files or directories in any shape or form. These directory structures can be normalised using the `@truffle/preserve` package so that all `Content` types are represented as `AsyncIterable<Buffer>`.

```typescript
export interface Target {
  source: Source;
}

export type Source = Content | Container;

export type Content = string | Bytes | Iterable<Bytes> | AsyncIterable<Bytes>;

export type Bytes = Buffer | ArrayBuffer | TypedArray;

export interface Container {
  entries: Iterable<Entry> | AsyncIterable<Entry>;
}

export interface Entry {
  path: string;
  source: Source;
}
```

##### Controls

The "controls" property contains a number of functions that are used to control the execution of your recipe with a state machine. This controls object has three functions: `update` updates the description of the recipe's CLI spinner, `step` creates a new sub-task, and `declare` declares a new value that can be resolved at a later time. The `step` and `declare` return new controller objects that are used to control the sub-task. A full reference of these controller objects can be found in the [typedocs](/docs/truffle/preserves/modules/_truffle_preserve.control.html).

#### Your custom functionality

Now that we discussed the `Recipe` interface and the parameters of the `execute` function, the rest of the recipe is up to you. Implement the code to preserve files and content to a custom storage platform, or build on top of the existing recipes to employ more advanced preservation strategies. For all the possibilities, check out the typedcos and the examples in the section below.

### Reference

A full reference of the `@truffle/preserve` package can be found in the [@truffle/preserve Typedocs](/docs/truffle/preserves).

To see examples of existing preserve recipes, refer to the source code of the recipes that are included in Truffle by default:

- [@truffle/preserve-fs source code](https://github.com/trufflesuite/truffle/tree/develop/packages/preserve-fs)
- [@truffle/preserve-to-ipfs source code](https://github.com/trufflesuite/truffle/tree/develop/packages/preserve-to-ipfs)
- [@truffle/preserve-to-filecoin source code](https://github.com/trufflesuite/truffle/tree/develop/packages/preserve-to-filecoin)
- [@truffle/preserve-to-buckets source code](https://github.com/trufflesuite/truffle/tree/develop/packages/preserve-to-buckets)
