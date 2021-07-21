const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js")

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You do not have pemission to execute this command.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require\`MANAGE_NICKNAMES\` permission.");

    //Variables:
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    //Input Checking:
    if (!args[0]) return message.channel.send("You must state a user to change a nickname.");
    if (!mentionedMember) return message.channel.send("The mentioned user is not in the server.");
    if (!nickName) return message.channel.send("You must state a nickname for the user.");
    if (!mentionedMember.kickable) return message.channel.send("I cannot change that users nickname, make sure my role is higher than theirs.")

    //Executing:
    await mentionedMember.setNickname(nickName).catch(err => console.log(err) && message.channel.send("I cannot add that nickname due to an error."));
  }
}