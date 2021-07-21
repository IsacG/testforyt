const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to execute this command.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I require \`MANAGE_CHANNELS\` permission.")

    //Variables:
    const role = message.guild.roles.cache.get('864935673333153842')
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    //Executing:
    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err));
    message.channel.send('This channel is now locked.');
  }
}