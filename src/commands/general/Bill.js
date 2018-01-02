const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Bill extends patron.Command {
  constructor() {
    super({
      names: ['bill'],
      groupName: 'general',
      description: 'Find a bill.',
      guildOnly: false,
      dmOnly: true,
      args: [
        new patron.Argument({
          name: 'index',
          key: 'bill',
          type: 'bill',
          example: '1'
        })
      ]
    });
  }

  async run(msg, args) {
    let choices = '```';
    const remaining = args.bill.endsAt - (Date.now() - args.bill.createdAt);
    const timeLeft = await NumberUtil.msToTime(remaining);

    let position = 1;

    for (const key in args.bill.choices) {
      if (args.bill.choices.hasOwnProperty(key)) {
        choices += '\n' + position++ + '. ' + args.bill.choices[key];
      }
    }

    return msg.channel.send('**Name:** ' + args.bill.name + '\n**Choices**: ' + choices + '```\n**Description:** ' + args.bill.description + '\n**Time left:** ' + NumberUtil.pad(timeLeft.days, 2) + ':' + NumberUtil.pad(timeLeft.hours, 2) + ':' + NumberUtil.pad(timeLeft.minutes, 2) + '.');
  }
}

module.exports = new Bill();
