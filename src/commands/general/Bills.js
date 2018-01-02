const patron = require('patron.js');
const bills = require('../../singletons/bills.js');

class Bills extends patron.Command {
  constructor() {
    super({
      names: ['bills'],
      groupName: 'general',
      description: 'Find all bills.',
      guildOnly: false,
      dmOnly: true
    });
  }

  async run(msg) {
    if (bills.size === 0) {
      return msg.channel.send('There\'s no bills.');
    }

    let message = '';

    for (const [key, value] of bills) {
      message += key + '. ' + value.name + '\n';
    }

    return msg.channel.send(message);
  }
}

module.exports = new Bills();
