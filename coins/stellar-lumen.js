'use strict';
const chalk     = require('chalk'),
      stellar   = require('stellar-hd-wallet'),
      open      = require('open');

module.exports = async (seed, prompt) => {

  const wallet  = stellar.fromSeed(seed),
        pub     = wallet.getPublicKey(1);

  console.log(`Stellar Public Key ${chalk.green(pub)}\n`);
  const option = await prompt.list('Menu', [ 'View Balance', 'Show Secret Key', 'Exit' ]);

  switch (option) {
    case 'View Balance':
      open(`https://stellarchain.io/address/${pub}`);
      break;

    case 'Show Secret Key':
      console.log('Secret Key ' + chalk.green(wallet.getSecret(1)));
      break;
  }

};