#!/usr/bin/env node
'use strict';

const bip39     = require('bip39'),
      bitcoin   = require('bitcoinjs-lib');

const mnemonic  = bip39.generateMnemonic(),
      hex       = bip39.mnemonicToSeedHex(mnemonic),
      seed      = bip39.mnemonicToSeed(mnemonic),
      root      = bitcoin.HDNode.fromSeedBuffer(seed);

const derive    = path => {
  const obj = root.derivePath(path);

  console.log(`\n${path}`);
  console.log(`Address: ${obj.getAddress()}`);
  console.log(`Public: ${obj.getPublicKeyBuffer().toString('hex')}`);
  console.log(`Private: ${obj.keyPair.toWIF()}`);
}
 
console.log(`mnemonic: ${mnemonic}`);
console.log(`seed: ${hex}`);
console.log(`xpub: ${root.neutered().toBase58()}`);
console.log(`xprv: ${root.toBase58()}`);

[0, 1, 2, 3, 4].forEach(item => derive(`m/44'/0'/0'/0/${item}`));