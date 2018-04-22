'use strict'
const chalk = require('chalk')
const LTC = require('../utils/ltc')

module.exports = async (seed, prompt) => {
  const coin = new LTC(seed)
  const option = await prompt.list('Menu', [ 'View Balance', 'Generate New Address', 'Show Extended Private Key', 'Exit' ])

  switch (option) {
    case 'View Balance':
      console.log('checking...')
      const res = await coin.balance()
      const balance = res[0] / 100000000

      console.log(`Total Balance ${chalk.green(balance + ' LTC')}`)
      console.log(`Number of Transcations ${chalk.green(res[1])}`)
      break

    case 'Generate New Address':
      console.log('generating...')
      const address = await coin.generate()
      console.log(`Litecoin Address ${chalk.green(address)}`)
      break

    case 'Show Extended Private Key':
      const key = coin.privates()
      console.log(`Extended Private Key ${chalk.green(key)}`)
      break
  }
}
