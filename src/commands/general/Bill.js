const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Bill extends patron.Command {
  constructor() {
    super({
      names: ['bill'],
      groupName: 'general',
      description: 'Find a bill.',
      guildOnly: false,
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
    const choiceCount = {};

    for (const choiceIndex of args.bill.votes.values()) {
      if (choiceCount.hasOwnProperty(choiceIndex) === false) {
        choiceCount[choiceIndex] = 1;
      } else {
        choiceCount[choiceIndex]++;
      }
    }

    for (let i = 0; i < args.bill.choices.length; i++) {
      choices += '\n' + position++ + '. ' + args.bill.choices[i] + (args.bill.endsAt - (Date.now() - args.bill.createdAt) <= 0 ? ': ' + (choiceCount[i] || 0) : '');
    }

    return msg.channel.send('**Name:** ' + args.bill.name + '\n**Choices**: ' + choices + '```\n**Description:** ' + args.bill.description + '\n**Time left:** ' + (args.bill.endsAt - (Date.now() - args.bill.createdAt) <= 0 ? '00:00:00' : NumberUtil.pad(timeLeft.hours, 2) + ':' + NumberUtil.pad(timeLeft.minutes, 2) + ':' + NumberUtil.pad(timeLeft.seconds, 2)));
  }
}

module.exports = new Bill();
