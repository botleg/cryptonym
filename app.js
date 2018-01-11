#!/usr/bin/env node
'use strict';

const bip39     = require('bip39'),
      chalk     = require('chalk'),
      clear     = require('cli-clear'),
      inquirer  = require('inquirer');

const Prompt    = require('./utils/prompt');

(async () => {

  const prompt   = new Prompt(inquirer),
        mnemonic = await prompt.simple('Mnemonic Phrase');
        

  if (!bip39.validateMnemonic(mnemonic)) {
    console.log(chalk.red.bold('✗ Invalid Mnemonic Phrase'));
    process.exit(1);
  }

  clear();
  console.log(chalk.bold.blue('CRYPTONYM\n'));

  const seed      = bip39.mnemonicToSeed(mnemonic),
        coin      = await prompt.list('Select Coin', [ 'Ether', 'Golem', 'Request Token', 'SONM', 'Stellar Lumen', 'Streamr DATAcoin' ]),
        lib       = require(`./coins/${coin.replace(/\s+/g, '-').toLowerCase()}`);

  await lib(seed, prompt);

})();