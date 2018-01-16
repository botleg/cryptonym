'use strict';
const chalk     = require('chalk'),
      LTC       = require('../utils/ltc');

module.exports = async (seed, prompt) => {

  const coin    = new LTC(seed),
        option  = await prompt.list('Menu', [ 'View Balance', 'Generate New Address', 'Show Extended Private Key', 'Exit' ]);

  switch (option) {
    case 'View Balance':

      console.log('checking...');
      const balance = (await coin.balance()) / 100000000;

      console.log(`Balance ${chalk.green(balance + ' LTC')}`);

      break;

    case 'Generate New Address':

      console.log('generating...');
      const address = await coin.generate();

      console.log(`Bitcoin Address ${chalk.green(address)}`);

      break;

    case 'Show Extended Private Key':

      const key = coin.privates();
      console.log(`Extended Private Key ${chalk.green(key)}`);

      break;
  }

};