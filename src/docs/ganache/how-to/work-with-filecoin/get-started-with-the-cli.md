---
title: Filecoin-flavored CLI
layout: docs.hbs
---
# Get Started With using the Filecoin-flavored Ganache CLI

## Requirements

Filecoin-flavored Ganache CLI requires [NodeJS](https://nodejs.org) version `12.13.0` or later.

You can check your current version by running:

```bash
node --version
```

## Installation

1. Install the `ganache` package globally with the `filecoin` tag (note that we're **not** installing the old `ganache-cli` package)
   ```bash
   npm install --global ganache@filecoin
   ```
1. Install the `@ganache/filecoin` globally
   ```bash
   npm install --global @ganache/filecoin
   ```

## Usage

The CLI can be easily ran by providing the `filecoin` argument to the `ganache` executable.

```bash
ganache filecoin
```

You should presented with a screen of all of the prefunded addresses and their private keys:

```
Ganache CLI v0.1.0 (ganache-core: 0.1.0)
Starting RPC server
2021-03-16T05:07:27.175Z INFO New heaviest tipset! [bafy2bzacecsmfrjsop5d5qtmxqyqenodd52xzoe4uorqkq7537gyade5mzpui] (height=0)

Available Accounts
==================
(0) t3rvcqmc5otc3sh3cngqg2ttzcu7ezpco466lbafzaoygxvnzsw7e7n2zbjwhiv5fdzhs6uxm2qckwt6lp5wga (100 FIL)
(1) t3s3la37547tijmoeiep7ktogws3tep2eqrralh7rhi2mpe46q574gceyy467356onblzvwf7ejlelo2rdsg4q (100 FIL)
(2) t3wk7a46e2dcqb7qxeuz2zq7wodwycdgtbgdpr37hhvelfilf5yvssg5xbsolgusqsumomtmtqhnobh4carhyq (100 FIL)
(3) t3ssnxhgmcea443y6bkcjgehxzzzqly6t3nic3tttb2gka4t7blfpshjvo5dtxkhxyqygja5b2vn5evont2nda (100 FIL)
(4) t3vtdookvprpwquu2g5abxsnnvvk2kzlh3uoq7cqjvmfposrozcbm6pm26xuo63wbypvbdecgyqpbxmuqpsela (100 FIL)
(5) t3u6cdui7nrxjtfl2wuwt642xsqlpziqodck7ew7fllrgx4induoik4oebyftmggxrf2bcgaaei7ngnnoc744q (100 FIL)
(6) t3v74brbo7e5e5nagvrbgxyccy47znpddhw2e3jzsj2zqjfe2kjnhxk32uxypdzzwpkobyzalsfhx3dfh6g4ea (100 FIL)
(7) t3rjlklkxt5ikfzj2wcsukyk4makuq4eugtcnx6y3lwjrw7h7dnfi47npbklvrjbyqe3vxpacpcupukacjvd2q (100 FIL)
(8) t3rihx2zizueb7n4dwmfzlsefzfnujbmjurmpsj474pip5qw2yq5migy3t5phofnicfa3bewvan5kwz3mxz7kq (100 FIL)
(9) t3wxnwc7gptzjfherhrg6cavic5uc3nb34wjp5ic6comad6xfnfgalxaus7q5ml2jptf5tisuuovogxjqh4jaq (100 FIL)

Private Keys
==================
(0) 7add859e8942a1009bc7795f5537c6505323a62c4cfc7c27fd48602841cf6b18
(1) ab8fe5451a44b9e12f6bd8ffb1760de60e0614c3563220537e0da29e69337947
(2) e16edeaba1b619a9a8f95cf2bae80fc3532307043f323dfa34911ad8714fe39d
(3) 2745fc03b31b2fb8907504b0aa00796c762a39f928260f5ba2dddccdca1933db
(4) 27194755b340e21df79d5451f67f054e01a9de18036901e3be08eeb46013a5a6
(5) a51831112131f6520a647fd5a845e39e4b62c780319c7b5e929d15c407b196e6
(6) 841e0ef5e1742949c79ce8bfd42a254debad75c189e89d98292cc60092dcad50
(7) 6dcc42d3ab8e581e1841ccb1c551f3dbb95118fc61f334fba0a17f2d548fbe96
(8) 899081442676fcb592aa3fad880ca1a7a48e7f05eb1caaf16f4c455114ddf598
(9) 525053ec3d8dd48db07177fdb5988acb07749525c0269af6f50d7320c5a29d3b

Lotus RPC listening on 127.0.0.1:7777
IPFS  RPC listening on 127.0.0.1:5001
```

If you would like to use the `ethereum` flavor, please use the [ganache-cli package](https://npmjs.com/package/ganache-cli).

## Configuration

See available options with:

```bash
ganache filecoin --help
```
