#!/usr/bin/env node
'use strict';

const bip39     = require('bip39'),
      bitcoin   = require('bitcoinjs-lib'),
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
        root      = bitcoin.HDNode.fromSeedBuffer(seed),
        coin      = await prompt.list('Select Coin', [ 'Ether', 'Request Token' ]),
        lib       = require(`./coins/${coin.replace(/\s+/g, '-').toLowerCase()}`);

  lib(root, prompt);

})();