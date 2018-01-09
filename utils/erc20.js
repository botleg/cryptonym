'use strict';
const chalk   = require('chalk'),
      ethUtil = require('ethereumjs-util'),
      open    = require('open');

class ERC20 {

  constructor (root, contract = null) {

    const key       = root.derivePath('m/44\'/60\'/1\'/0/0'),
          pvt       = key.keyPair.d.toBuffer(),
          buffer    = ethUtil.privateToAddress(pvt);

    this.address    = ethUtil.toChecksumAddress(buffer.toString('hex'));
    this.contract   = contract;
    this.pvt        = pvt;

    console.log(`Ethereum Address ${chalk.green(this.address)}\n`);

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