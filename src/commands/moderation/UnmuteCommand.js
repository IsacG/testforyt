const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js")

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
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
     const unmuteEmbed = new Discord.MessageEmbed()
       .setTitle(`You have been unmuted in ${message.guild.name}`)
       .setDescription(`Reason: ${reason}`)
       .setColor("#add8e6")
       .setTimestamp();
 
     //Input Checking:
     if (!args[0]) return message.channel.send("\`-unmute @user reason\`");
     if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
     if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot unmute yourself.");
     if (mentionedMember.user.id == client.user.id) return message.channel.send("YOU FOOL you cannot mute me with my own command.");
     if (!reason) reason = 'No reason given.';
     if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel('This member is already unmuted.')
     if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute someone the same role or higher than you.')
 
     //Executing:
     await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
     await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('There Was an issue adding the member role')));
     await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There Was an issue removing the muted role')));
  }
}