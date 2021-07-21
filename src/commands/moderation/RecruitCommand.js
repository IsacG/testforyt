const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js")

module.exports = class RecruitCommand extends BaseCommand {
  constructor() {
    super('recruit', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to execute this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have \`MANAGE_ROLES\` permission.");

    //Variables:
    const pingRole = message.guild.roles.cache.get('864928541711794177');
    const staffRole = message.guild.roles.cache.get('864928467501973526');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const staffPrefix = 'Staff | '

    //Input Checking:
    if (!pingRole) return message.channel.send('There is no ping role to give.');
    if (!staffRole) return message.channel.send('There is no staff role to give.');
    if (!args[0]) return message.channel.send("\`-recruit @user\` or \`-recruit ID\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");

    //Executing:
    await mentionedMember.roles.add(pingRole.id).catch(err => message.channel.send("I was unable to give the staff role due to a error"));
    await mentionedMember.roles.add(staffRole.id).catch(err => message.channel.send("I was unable to give the staff role due to a error"));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username).catch(err => console.log(err));
  }
}