const Constants = require('../utility/Constants.js');
const client = require('../singletons/client.js');

client.on('ready', () => {
  (async () => {
    return console.log('Successfully Connected.', 'INFO');
  })()
    .catch((err) => Logger.handleError(err));
});
