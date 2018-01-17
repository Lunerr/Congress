const client = require('../singletons/client.js');

client.on('ready', () => {
  (async () => console.log('Successfully Connected.', 'INFO'))()
    .catch((err) => console.error(err));
});
