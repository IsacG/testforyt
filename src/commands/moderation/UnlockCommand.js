const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', []);
  }

  async run(client, message, args) {
      //Permission Checking:
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to execute this command.");
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I require \`MANAGE_CHANNELS\` unpermission.")
  
      //Variables:
      const role = message.guild.roles.cache.get('864935673333153842')
      let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!lockChannel) lockChannel = message.channel;
  
      //Executing:
      await lockChannel.updateOverwrite(role, {
        SEND_MESSAGES: true
      }).catch(err => console.log(err));
      message.channel.send('This channel is now unlocked.');
  }
}