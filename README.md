# Cryptonym

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Offline command-line wallet that doesn't store anything on disc. All you need to have is a 12 word phrase (can be generated from the app) that lets you generate the public and private keys for your accounts. This supports HD wallets that lets you create a new address for every transaction (for bitcoin, bitcoin cash and litecoin). This will only lets you receive coins and check balance. To send coins, you need to export the private keys from this application and use it in dedicated wallets. To know more about the working, check [this](https://botleg.com/stories/local-cryptocurrency-wallet-that-doesnt-store-anything/) blog post.

## Supported Coins
1. [Bitcoin](https://bitcoin.org/)
2. [Bitcoin Cash](https://www.bitcoincash.org/)
3. [Ether](https://www.ethereum.org/)
4. [Golem](https://golem.network/)
5. [Litecoin](https://litecoin.org/)
6. [Request Token](https://request.network/)
7. [SONM](https://sonm.io/)
8. [Stellar Lumen](https://www.stellar.org/)
9. [Streamr DATAcoin](https://www.streamr.com/)

## Run Instruction

* Clone the repository
* Install dependencies with `npm install`.
* Make the tool executable with `npm link`.
* Run the tool with the command `cryptonym`.
