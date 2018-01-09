const ERC20 = require('../utils/erc20');

module.exports = async (root, prompt) => {

  const token = new ERC20(root);
  await token.menu(prompt);

};