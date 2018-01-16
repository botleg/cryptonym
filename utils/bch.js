'use strict';
const axios     = require('axios');

class BCH {

  constructor (root) {
    this.root   = root;
  }

  privates () {
    return this.root.derivePath(`m/44'/145'/0'`).toBase58();
  }

  async check (address) {

    const res = await axios(`https://blockexplorer.com/api/addr/${address}`);

    return {
      balance       : res.data['balance'],
      transcations  : res.data['txApperances']
    }

  }

  async balance () {

    let address = null,
        balance = 0,
        data    = null;

    for (let item of [0, 1]) {
      let index   = 0;

      do {
        address = this.root.derivePath(`m/44'/145'/0'/${item}/${index}`).getAddress();
        data    = await this.check(address);
        balance += data.balance;
        index++;
      } while (data.transcations);
    }

    return balance;

  }

  async generate () {

    let address = null,
        data    = null,
        index   = 0;

    do {
      address = this.root.derivePath(`m/44'/145'/0'/0/${index}`).getAddress();
      data    = await this.check(address);
      index++;
    } while (data.transcations);

    return address;

  }

}

module.exports = BCH;