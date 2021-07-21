const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js")

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to execute this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission.");

    //Variables:
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get("864940788575502346");
    const memberRole = message.guild.roles.cache.get("864935673333153842");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#add8e6")
      .setTimestamp();

    //Input Checking:
    if (!args[0]) return message.channel.send("\`-mute @user reason\`");
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot mute yourself.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("YOU FOOL you cannot mute me with my own command.");
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel('This member is already muted.')
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone the same role or higher than you.')

    //Executing:
    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There Was an issue adding the muted role')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There Was an issue removing the member role')));
  }
}