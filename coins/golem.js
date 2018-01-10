const ERC20 = require('../utils/erc20');

module.exports = async (root, prompt) => {

  const token = new ERC20(root, '0xa74476443119A942dE498590Fe1f2454d7D4aC0d');
  await token.menu(prompt);

};