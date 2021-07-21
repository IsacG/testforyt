const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to execute this command.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I require \`MANAGE_CHANNELS\` permission.");

    //Variables:
    const value = Number(args[0]);

    //Input Checking:
    if (!args[0]) return message.channel.send("You need to state a number in which how long you would like the slowmode to be set to.");
    if (!value || value < 5 || value > 21600) return message.channel.send("You need to state a number between 5 and 21600, which represents the seconds the slowmode will be.");

    //Executing:
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(`The slowmode for ${message.channel} is set to ${value} seconds.`);
    } catch (err) {
      console.log(err);
      message.channel.send("Something went wrong setting the slowmode.");
    }
  }
}