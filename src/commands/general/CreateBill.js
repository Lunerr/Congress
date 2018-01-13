const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');
const bill = require('../../structures/bill.js');
const bills = require('../../singletons/bills.js');
let billCount = 0;

class CreateBill extends patron.Command {
  constructor() {
    super({
      names: ['createbill', 'makebill'],
      groupName: 'general',
      description: 'Make that damn bill.',
      cooldown: 14400000,
      guildOnly: false,
      dmOnly: true,
      args: [
        new patron.Argument({
          name: 'name',
          key: 'name',
          type: 'string',
          example: '"is john gay"'
        }),
        new patron.Argument({
          name: 'choices',
          key: 'choices',
          type: 'string',
          example: 'johngay~yes'
        }),
        new patron.Argument({
          name: 'description',
          key: 'description',
          type: 'string',
          example: 'i feel like x should be slammed because x',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const choices = args.choices.split('~');
    let answers = '```';

    for (let i = 0; i < choices.length; i++) {
      answers += '\n' + (i + 1) + '. ' + choices[i];
      if (choices[i + 1] === choices[i]) {
        return msg.reply('You may not have multiple choices that are identicle.');
      } else if (choices[i].length > Constants.bills.maxAnswerChar) {
        return msg.reply('You may not have more than ' + Constants.bills.maxAnswerChar + ' characters in your answer.');
      }
    }

<<<<<<< HEAD
    billCount++;
=======
    const daysInMs = await NumberUtil.daysToMs(args.days);

    pollCount++;
>>>>>>> 36907e107c6c5a6343016e1b6d0862d86e8f65b6

    const guild = msg.client.guilds.get(Constants.serverId);
    const congressChannel = guild.channels.get(Constants.congressChannelId);
    const priavteCongressChannel = guild.channels.get(Constants.privateCongressChannelId);
    const pinnedMessages = await congressChannel.fetchPinnedMessages();

    pinnedMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

    const oldestPin = pinnedMessages.first();

    if (oldestPin !== undefined) {
      oldestPin.unpin();
    }

    bills.set(billCount, new bill(args.name, args.description, choices, Constants.billLength));
    const endBillCount = billCount;
    await priavteCongressChannel.send('@everyone A new bill has been posted in ' + congressChannel + '.');
    const newBillMessage = await congressChannel.send('**Bill:** ' + args.name + '\n**Choices**: ' + answers + '```\n**Description:** ' + args.description + '.');
    newBillMessage.pin();
    await msg.channel.send('Successfully made bill **' + args.name + '**.');
    return msg.client.setTimeout(async () => {
      const createdBill = bills.get(endBillCount);
      const choiceCount = {};

      for (const choiceIndex of createdBill.votes.values()) {
        if (choiceCount.hasOwnProperty(choiceIndex) === false) {
          choiceCount[choiceIndex] = 1;
        } else {
          choiceCount[choiceIndex]++;
        }
      }

      let message = '```';
      let position = 1;

      for (let i = 0; i < createdBill.choices.length; i++) {
        message += position++ + '. ' + createdBill.choices[i] + ': ' + (choiceCount[i] || 0) + '\n';
      }

      return congressChannel.send('A bill has ended.\n' + message + '```\nFinal results: `' + createdBill.name + '`.');
    }, Constants.billLength);
  }
}

module.exports = new CreateBill();
