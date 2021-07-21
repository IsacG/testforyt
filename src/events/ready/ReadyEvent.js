const { User } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    let serversIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
    client.user.setPresence({
      activity: {
        name: `${serversIn} servers.`,
        type: "WATCHING"
      },
      status: 'dnd'
    })
    .catch(console.error)
  client.user.setUsername("MBI-Bot")
  .then(user => console.log(`My new username is ${user.username}`))
  .catch(console.error)
  }
}
