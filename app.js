#!/usr/bin/env node
'use strict'

const bip39 = require('bip39')
const chalk = require('chalk')
const clear = require('cli-clear')
const inquirer = require('inquirer')
const Prompt = require('./utils/prompt');

(async () => {
  const prompt = new Prompt(inquirer)
  const mnemonic = await prompt.simple('Mnemonic Phrase (leave empty to generate one)')

  if (mnemonic.trim() === '') {
    console.log(`Mnemonic Phrase ${chalk.green(bip39.generateMnemonic())}`)
    console.log(`Save this phrase in a safe place and use it from now on. ${chalk.red('This phrase will never be generated again.')}`)
    process.exit(0)
  }

  if (!bip39.validateMnemonic(mnemonic)) {
    console.log(chalk.red.bold('✗ Invalid Mnemonic Phrase'))
    process.exit(1)
  }

  clear()
  console.log(chalk.bold.blue('CRYPTONYM\n'))

  const seed = bip39.mnemonicToSeed(mnemonic)
  const coin = await prompt.list('Select Coin', [ 'Bitcoin', 'Bitcoin Cash', 'Ether', 'Golem', 'Litecoin', 'Request Token', 'SONM', 'Stellar Lumen', 'Streamr DATAcoin' ])
  const lib = require(`./coins/${coin.replace(/\s+/g, '-').toLowerCase()}`)

  await lib(seed, prompt)
})()
