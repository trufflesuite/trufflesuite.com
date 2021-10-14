---
hide:
  - navigation
---

# Drizzle Vue Box

This starter box comes with the basics to create a drizzle connected Vue
dapp. It leverages [drizzle's Vue
plugin](https://github.com/trufflesuite/drizzle-suite/tree/develop/packages/vue-plugin#vue-plugin)

Check out this sweet 3 part video series **Create a Vue Dapp on Ethereum with
the Drizzle Vue plugin** by Julien Klepatch: [Part
I](https://www.youtube.com/watch?v=XaVEZ1ucxac), [Part
II](https://www.youtube.com/watch?v=ApJwXfWKl7Q) and [Part
III](https://www.youtube.com/watch?v=xyoztqeYd6U)

## Install

1. First ensure you've navigated to an empty folder as Truffle will download
   boxes in the current working directory.
   ```
   $ mkdir my-sweet-vue-dapp && cd $_
   ```

1. Execute the `unbox` command and watch truffle orchestrate devops magic.
   ```
   $ truffle unbox vue-box
   ```

## Test

1. Test the box. You'll need a browser and two terminal instances: one for
   truffle's develop console and one for Vue's dev server.

   a. Truffle terminal.
     - Start the development console
     ```
     $ truffle develop
     ```
     - Migrate the sample contracts
     ```
     truffle(develop)> migrate
     ```
     - wait for the migration to complete before proceeding

   b. Start the Vue dev server, which is located in the `vapp` folder
   ```
   $ cd vapp
   $ npm run serve
   ```
   c. Browser: You can test with or without metamask.
     - without MetaMask
       - Use Chrome's `incognito mode` or Firefox's `privacy mode` and navigate
         to: http://localhost:8080/
     - with MetaMask
       - Make sure you've set up metamask to use port 9545 and then navigate
         to: http://localhost:8080/

