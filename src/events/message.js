const client = require('../singletons/client.js');
const discord = require('discord.js');
const NumberUtil = require('../utility/NumberUtil.js');
const patron = require('patron.js');
const Constants = require('../utility/Constants.js');
const handler = new patron.Handler(client.registry);

client.on('message', (msg) => {
  (async () => {
    if (msg.author.bot || Constants.regexes.prefix.test(msg.content) === false) {
      return;
    }

    const result = await handler.run(msg, Constants.prefix);

    if (result.success === false) {
      let message;

      switch (result.commandError) {
        case patron.CommandError.CommandNotFound: {
          return;
        }
        case patron.CommandError.Cooldown: {
          const cooldown = NumberUtil.msToTime(result.remaining);

          return msg.channel.send('**Cooldown:**\nHours: ' + cooldown.hours + '\nMinutes: ' + cooldown.minutes + '\nSeconds: ' + cooldown.seconds);
        }
        case patron.CommandError.Exception:
          if (result.error instanceof discord.DiscordAPIError) {
            if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
              message = 'I do not have permission to do that.';
            } else if (result.error.code === 50007) {
              message = 'I do not have permission to message you. Try allowing DMs from server members.';
            } else if (result.error.code >= 500 && result.error.code < 600) {
              message = 'Houston, we have a problem. Discord internal server errors coming in hot.';
            } else {
              message = result.errorReason;
            }
          } else if (result.error.code === '22P02' || result.error.code === '22003') {
            message = 'An error has occurred due to the use of excessively large numbers.';
          } else {
            message = result.errorReason;
            await console.log(result.error);
          }
          break;
        case patron.CommandError.InvalidArgCount:
          message = 'You are incorrectly using this command.\n**Usage:** `' + Constants.prefix + result.command.getUsage() + '`\n**Example:** `' + Constants.prefix + result.command.getExample() + '`';
          break;
        default:
          message = result.errorReason;
          break;
      }

      return msg.channel.send(message);
    }
  })()
    .catch((err) => console.log(err));
});
