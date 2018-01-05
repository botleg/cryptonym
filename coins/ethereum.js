const chalk   = require('chalk'),
      ethUtil = require('ethereumjs-util'),
      open    = require('open');

module.exports = async (root, prompt) => {

  const key       = root.derivePath('m/44\'/60\'/1\'/0/0'),
        pvt       = key.keyPair.d.toBuffer(),
        buffer    = ethUtil.privateToAddress(pvt),
        address   = ethUtil.toChecksumAddress(buffer.toString('hex'));

  console.log(`Ethereum Address ${chalk.green(address)}\n`);
  
  const option = await prompt.list('Menu', [ 'View Balance', 'Show Private Key', 'Exit' ]);
  switch (option) {
    case 'View Balance':
      open(`https://etherscan.io/address/${address}`);
      break;

    case 'Show Private Key':
      console.log('Private Key ' + chalk.green(ethUtil.addHexPrefix(pvt.toString('hex'))));
      break;
  }

};