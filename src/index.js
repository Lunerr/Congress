const path = require('path');
const discord = require('discord.js');
const patron = require('patron.js');
const client = require('./singletons/client.js');
const Constants = require('./utility/Constants.js');
const registry = require('./singletons/registry.js');
const credentials = require('./credentials.json');

client.registry = registry;

patron.RequireAll(path.join(__dirname, 'events'));

(async () => {
  return client.login(credentials.token);
})()
  .catch((err) => console.log(err));