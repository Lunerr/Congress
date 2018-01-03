const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');
const bill = require('../../structures/bill.js');
const bills = require('../../singletons/bills.js');
const NumberUtil = require('../../utility/NumberUtil.js');
let pollCount = 0;

class CreateBill extends patron.Command {
  constructor() {
    super({
      names: ['createbill', 'makepoll'],
      groupName: 'general',
      description: 'Make that damn bill.',
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
          name: 'lasting days',
          key: 'days',
          type: 'float',
          example: '3'
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
        return msg.channel.send('You may not have multiple choices that are identicle.');
      } else if (choices[i].length > Constants.bills.maxAnswerChar) {
        return msg.channel.send('You may not have more than ' + Constants.bills.maxAnswerChar + ' characters in your answer.');
      }
    }

    const daysInMs = await NumberUtil.daysToMs(args.days);

    pollCount++;

    const guild = msg.client.guilds.get(Constants.serverId);
    const congressChannel = guild.channels.get(Constants.congressChannelId);
    const priavteCongressChannel = guild.channels.get(Constants.privateCongressChannelId);

    bills.set(pollCount, new bill(args.name, args.description, choices, Date.now(), daysInMs));
    const endBillCount = pollCount;
    await priavteCongressChannel.send('@everyone new poll in ' + congressChannel);
    await congressChannel.send('A Poll Has Been Created\n**Name:** ' + args.name + '\n**Choices**: ' + answers + '```\n**Description:** ' + args.description + '.');
    await msg.channel.send('Successfully made poll **' + args.name + '**.');
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

      for (let i = 0; i < createdBill.choices.length; i++) {
        message += createdBill.choices[i] + ': ' + (choiceCount[i] || 0) + '\n';
      }

      return congressChannel.send('**A Bill Has Ended**\n' + message + '```\nFinal bill results of `' + createdBill.name + '`.');
    }, daysInMs);
  }
}

module.exports = new CreateBill();
