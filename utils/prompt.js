'use strict'

class Prompt {
  constructor (inquirer) {
    this.inquirer = inquirer
  }

  async simple (message) {
    const response = await this.inquirer.prompt([{
      message: message,
      name: 'data',
      type: 'input'
    }])
    return response.data
  }

  async list (message, items) {
    const response = await this.inquirer.prompt([{
      choices: items,
      message: message,
      name: 'data',
      type: 'list'
    }])
    return response.data
  }
}

module.exports = Prompt
