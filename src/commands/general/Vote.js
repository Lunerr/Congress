const patron = require('patron.js');
const crypto = require('crypto-js');

class Vote extends patron.Command {
  constructor() {
    super({
      names: ['vote'],
      groupName: 'general',
      description: 'Vote on a bill.',
      guildOnly: false,
      dmOnly: true,
      args: [
        new patron.Argument({
          name: 'index',
          key: 'bill',
          type: 'bill',
          example: '1'
        }),
        new patron.Argument({
          name: 'choice',
          key: 'choice',
          type: 'int',
          example: '2'
        }),
        new patron.Argument({
          name: 'password',
          key: 'password',
          type: 'string',
          example: 'ILikeMen238',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const choice = args.bill.choices.find((x, y) => y === args.choice - 1);
    const choiceIndex = args.bill.choices.findIndex((x, y) => y === args.choice - 1);

    if (choice === undefined) {
      return msg.reply('This choice does not exist.');
    } else if (args.bill.endsAt - (Date.now() - args.bill.createdAt) <= 0) {
      return msg.reply('This bill is already over.');
    }

    const password = await crypto.SHA3(args.password).toString();

    if (args.bill.votedIds.includes(msg.author.id)) {
      if (args.bill.votes.has(password) === false) {
        return msg.reply('Your password is incorrect.');
      }
    } else {
      await args.bill.votedIds.push(msg.author.id);
    }

    await args.bill.votes.set(password, choiceIndex);
    return msg.channel.send('You have successfully voted `' + choice + '` on bill `' + args.bill.name + '`.');
  }
}

module.exports = new Vote();
