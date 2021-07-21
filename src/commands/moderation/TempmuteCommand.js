const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms')

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to execute this command.")
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission.")

    //Variables:
    const muteRole = message.guild.roles.cache.get("864940788575502346");
    const memberRole = message.guild.roles.cache.get("864935673333153842");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#add8e6")
      .setTimestamp()
    const tempunmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription("Reason: Mute duration has expired.")
      .setColor("#add8e6")
      .setTimestamp()

    //Input Checking:
    if (!args[0]) return message.channel.send("You must state a user to temp mute. \`-tempmute @user time\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot tempmute someone the same or higher role as yourself.");
    if (!time) return message.channel.send("You must state a duration of time to temp mute. \`-tempmute @user time\`");
    if (!reason) reason = 'No reason given.'

    //Executing:
    await mentionedMember.roles.add(muteRole.id).catch(err =>console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err =>console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err =>console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err =>console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch(err =>console.log(err));
      await mentionedMember.send(tempunmuteEmbed).catch(err =>console.log(err));
    }, ms(time));
  }
}