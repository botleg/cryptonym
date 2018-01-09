const ERC20 = require('../utils/erc20');

module.exports = async (root, prompt) => {

  const token = new ERC20(root, '0x8f8221afbb33998d8584a2b05749ba73c37a938a');
  await token.menu(prompt);

};