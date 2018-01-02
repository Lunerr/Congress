const patron = require('patron.js');

class Congress extends patron.Precondition {
  constructor() {
    super({
      name: 'congress'
    });
  }

  async run(command, msg) {
    if (msg.member.roles.has('395391128519573509')) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You must be a Congress member to use this command.');
  }
}

module.exports = new Congress();
