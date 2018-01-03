const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Congress extends patron.Precondition {
  constructor() {
    super({
      name: 'congress'
    });
  }

  async run(command, msg) {
    const guildMember = await msg.client.guilds.get(Constants.serverId).fetchMember(msg.author);
    if (guildMember.roles.has(Constants.roleId)) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You must be a Congress member to use this command.');
  }
}

module.exports = new Congress();
