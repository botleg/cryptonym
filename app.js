#!/usr/bin/env node
'use strict';

const bip39     = require('bip39'),
      chalk     = require('chalk'),
      inquirer  = require('inquirer');

const Prompt    = require('./utils/prompt');

(async () => {

  const prompt   = new Prompt(inquirer),
        mnemonic = await prompt.simple('Mnemonic Phrase');

  if (!bip39.validateMnemonic(mnemonic)) {
    console.log(chalk.red.bold('✗ Invalid Mnemonic Phrase'));
    process.exit(1);
  }

})();