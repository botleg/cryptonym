'use strict'
const axios = require('axios')
const bitcoin = require('bitcoinjs-lib')

class LTC {
  constructor (seed) {
    this.account = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.litecoinXprv)
    this.root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.litecoin)
  }

  privates () {
    return this.account.derivePath(`m/44'/2'/0'`).toBase58()
  }

  async check (address) {
    const res = await axios(`https://api.blockcypher.com/v1/ltc/main/addrs/${address}?limit=1`)

    return {
      balance: res.data['final_balance'],
      transcations: res.data['n_tx']
    }
  }

  async balance () {
    let address = null
    let balance = 0
    let transcations = 0
    let data = null

    for (let item of [0, 1]) {
      let index = 0

      do {
        address = this.root.derivePath(`m/44'/2'/0'/${item}/${index}`).getAddress()
        data = await this.check(address)

        balance += data.balance
        transcations += data.transcations
        index++
      } while (data.transcations)
    }

    return [ balance, transcations ]
  }

  async generate () {
    let address = null
    let data = null
    let index = 0

    do {
      address = this.root.derivePath(`m/44'/2'/0'/0/${index}`).getAddress(this.network)
      data = await this.check(address)
      index++
    } while (data.transcations)

    return address
  }
}

module.exports = LTC
