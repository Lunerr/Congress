const client = require('../structures/Client.js');
const Constants = require('../utility/Constants.js');
const bills = require('./singletons/bills.js');

client.setInterval(async () => {
  for (let i = 0; i < bills.size; i++) {
    if ((Date.now() - bills[i].createdAt) - bills[i].endsAt <= 0) {
      continue;
    }

    console.log('starting');

    const channel = client.channels.get('395399853196443653');

    if (channel === undefined) {
      continue;
    }

    console.log('channel\'s defined.');

    const choiceCount = [];

    for (const choiceIndex of bills[i].votes.values()) {
      choiceCount[choiceIndex]++;
    }

    console.lod('done loop.');

    let message = '';

    for (let i = 0; i < bills[i].choices.length; i++) {
      message += bills.choices[i] + ': ' + choiceCount[i];
    }

    console.log('should be sending');

    await channel.send(mesasge + 'Final Poll Results Of `' + bills[i].name + '`.');
  }
}, Constants.intervals.autoRemoveBill);
