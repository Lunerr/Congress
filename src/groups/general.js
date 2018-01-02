const patron = require('patron.js');

class General extends patron.Group {
  constructor() {
    super({
      name: 'general',
      description: 'These are the general commands, always used.'
    });
  }
}

module.exports = new General();
