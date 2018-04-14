'use strict'
const ERC20 = require('../utils/erc20')

module.exports = async (seed, prompt) => {
  const token = new ERC20(seed, '0x0cf0ee63788a0849fe5297f3407f701e122cc023')
  await token.menu(prompt)
}
