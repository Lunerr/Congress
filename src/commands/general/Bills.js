const patron = require('patron.js');
const bills = require('../../singletons/bills.js');

class Bills extends patron.Command {
  constructor() {
    super({
      names: ['bills'],
      groupName: 'general',
      description: 'Find all bills.',
      guildOnly: false
    });
  }

  async run(msg) {
    if (bills.size === 0) {
      return msg.reply('No bills have been created.');
    }

    let message = '';

    for (const [key, value] of bills) {
      message += key + '. ' + value.name + '\n';
    }

    return msg.channel.send(message);
  }
}

module.exports = new Bills();
