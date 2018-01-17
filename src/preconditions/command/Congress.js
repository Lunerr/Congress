const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Congress extends patron.Precondition {
  constructor() {
    super({
      name: 'congress'
    });
  }

  async run(command, msg) {
    const guild = await msg.client.guilds.get(Constants.serverId);
    const guildMember = await guild.fetchMember(msg.author);
    if (guildMember.roles.has(Constants.roleId)) {
      msg.realGuild = guild;
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You must be a Congress member to use this command.');
  }
}

module.exports = new Congress();
