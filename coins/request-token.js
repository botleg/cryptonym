'use strict';
const ERC20 = require('../utils/erc20');

module.exports = async (seed, prompt) => {

  const token = new ERC20(seed, '0x8f8221afbb33998d8584a2b05749ba73c37a938a');
  await token.menu(prompt);

};