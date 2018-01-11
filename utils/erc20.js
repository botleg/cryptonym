'use strict';
const bitcoin   = require('bitcoinjs-lib'),
      chalk     = require('chalk'),
      ethUtil   = require('ethereumjs-util'),
      open      = require('open');

class ERC20 {

  constructor (seed, contract = null) {

    const account   = this.hash(contract),
          root      = bitcoin.HDNode.fromSeedBuffer(seed),
          key       = root.derivePath(`m/44'/60'/${account}'/0/0`),
          pvt       = key.keyPair.d.toBuffer(),
          buffer    = ethUtil.privateToAddress(pvt);

    this.address    = ethUtil.toChecksumAddress(buffer.toString('hex'));
    this.contract   = contract;
    this.pvt        = pvt;

    console.log(`Ethereum Address ${chalk.green(this.address)}\n`);

  }

  hash (str) {

    let hash = 0;
    if (!str) {
      str = '0x0000000000000000000000000000000000000000';
    }

    for (let char of str) {
      hash = ((hash << 5) - hash) + char.charCodeAt();
      hash = hash & hash;
    }

    return hash;

  }

  async menu (prompt) {

    const option = await prompt.list('Menu', [ 'View Balance', 'Show Private Key', 'Exit' ]);

    switch (option) {
      case 'View Balance':
        
        if (this.contract) {
          open(`https://etherscan.io/token/${this.contract}?a=${this.address}`);
        } else {
          open(`https://etherscan.io/address/${this.address}`);
        }

        break;

      case 'Show Private Key':
        console.log('Private Key ' + chalk.green(ethUtil.addHexPrefix(this.pvt.toString('hex'))));
        break;
    }

  }

}

module.exports = ERC20;