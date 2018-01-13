class Constants {
  constructor() {
    this.disabledEvents = [
      'CHANNEL_PINS_UPDATE',
      'MESSAGE_UPDATE',
      'MESSAGE_REACTION_ADD',
      'MESSAGE_REACTION_REMOVE',
      'MESSAGE_REACTION_REMOVE_ALL',
      'VOICE_STATE_UPDATE',
      'TYPING_START',
      'VOICE_SERVER_UPDATE',
      'RELATIONSHIP_ADD',
      'RELATIONSHIP_REMOVE'
    ];

    this.prefix = '$';

    this.regexes = {
      capital: /([A-Z])/g,
      capitalize: /\w\S*/g,
      first: /^./,
      markdown: /(\*|~|`|_)+/g,
      prefix: /^\$/
    };

    this.serverId = '290759415362224139';
    this.congressChannelId = '395727773467017218';
    this.privateCongressChannelId = '395760284305850368';
    this.roleId = '379970786385068042';

    this.billLength = 86400000;

    this.intervals = {
      autoRemoveBill: 1000
    };

    this.bills = {
      maxAnswerChar: 24
    };
  }
}

module.exports = new Constants();

