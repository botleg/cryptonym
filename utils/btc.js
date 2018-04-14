'use strict'
const axios = require('axios')

class BTC {
  constructor (root) {
    this.root = root
  }

  privates () {
    return this.root.derivePath(`m/44'/0'/0'`).toBase58()
  }

  async check (address) {
    const res = await axios(`https://blockchain.info/balance?active=${address}`)

    if (address in res.data) {
      return {
        balance: res.data[address]['final_balance'],
        transcations: res.data[address]['n_tx']
      }
    }
  }

  async balance () {
    let address = null
    let balance = 0
    let data = null

    for (let item of [0, 1]) {
      let index = 0

      do {
        address = this.root.derivePath(`m/44'/0'/0'/${item}/${index}`).getAddress()
        data = await this.check(address)
        balance += data.balance
        index++
      } while (data.transcations)
    }

    return balance
  }

  async generate () {
    let address = null
    let data = null
    let index = 0

    do {
      address = this.root.derivePath(`m/44'/0'/0'/0/${index}`).getAddress()
      data = await this.check(address)
      index++
    } while (data.transcations)

    return address
  }
}

module.exports = BTC
