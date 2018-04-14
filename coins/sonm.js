'use strict'
const ERC20 = require('../utils/erc20')

module.exports = async (seed, prompt) => {
  const token = new ERC20(seed, '0x983f6d60db79ea8ca4eb9968c6aff8cfa04b3c63')
  await token.menu(prompt)
}
