# Truffle Boxes

## Creating a box

To create a Truffle Box you'll need a few things:
* A GitHub repository
* A configuration file
* Optionally, small and large images for the box's listing

The configuration file and images belong in the top-level directory of your repo. With these files in place, and your repo on GitHub, the unbox command will be: `truffle unbox {USER_NAME || ORG_NAME}/{REPO_NAME}`

If you're **starting from scratch**, we've created a [blueprint box](/boxes/blueprint) containing a configuration file with common values, as well as template versions of the small and large images.

If you're using **an existing project**, [download the files here](/files/truffle-box-essentials.zip) and extract them into your project.

## Configuration file

All truffle boxes include a configuration file, `truffle-box.json`. This file has three attributes: `ignore`, `commands`, and `hooks`.

### <span style="text-transform: none;">`ignore`</span> (array)

An array of files or relative paths you'd like Truffle to ignore when unboxing. Common files include the `readme.md` or `.gitignore`.

```javascript
"ignore": [
  "README.md",
  ".gitignore"
]
```

### <span style="text-transform: none;">`commands`</span> (object)

An object who's key/value pairs are a descriptor and console command respectively. These pairs will be shown to users once your box is successfully unboxed. Think of these as quick instructions.

For example, consider the object below. We've given our users all they need to compile, migrate and test their smart contracts, along with commands for developing the front-end.

```javascript
"commands": {
  "Compile": "truffle compile",
  "Migrate": "truffle migrate",
  "Test contracts": "truffle test",
  "Test dapp": "npm test",
  "Run dev server": "npm run start",
  "Build for production": "npm run build"
}
```

### <span style="text-transform: none;">`hooks`</span> (object)

An object containing console commands to execute once unboxed. Since we're working in Node.js, most commonly this will contain `npm install`.

```javascript
"hooks": {
  "post-unpack": "npm install"
}
```

## Images

The large box image is a 512px square with 32px of padding on each side.

![Large Box Image Template](/images/ballotin/box-img-lg-template.png)

The small box image is 735px x 100px. There is 32px of padding on the left side of the banner, and it's minimum size (described in the template as "Min Banner Width") is 290px, including the left padding. The banners are fixed to the left side and crop off the right side as the window narrows.

![Small Box Image Template](/images/ballotin/box-img-sm-template.png)

If no images are provided in a box, we default to banners containing the Truffle logo:

![Default Large Image](/images/ballotin/loading-thumb.png)

![Default Small Image](/images/ballotin/loading-banner.png)

## Truffle site listing

Before being listed on the Truffle website, all boxes undergo a screening process to ensure compatibility with Truffle. To start the pre-screening process, <a href="mailto:info@trufflesuite.com">send us an email</a> with your desired box name and brief description, along with a link to its GitHub repo to: [info@trufflesuite.com](mailto:info@trufflesuite.com).
