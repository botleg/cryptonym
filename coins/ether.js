'use strict'
const ERC20 = require('../utils/erc20')

module.exports = async (seed, prompt) => {
  const token = new ERC20(seed)
  await token.menu(prompt)
}
