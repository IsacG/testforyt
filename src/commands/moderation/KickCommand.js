const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

 async run(client, message, args) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to execute this command.")
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!"
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot kick someone the same or higher role as yourself.");
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason : ${reason}`)
      .setColor("#add8e6")
      .setTimestamp()
      .setFooter(client.user.tag ,client.user.displayAvatarURL());


      // -kick @user
   if (!args[0]) return message.channel.send("You need to state a user to kick. Example: \`-kick @user reason\`");
   if (!mentionedMember) return message.channel.send("The mentioned user is not in the server.")
   if (!mentionedMember.kickable) return message.channel.send('I cannot kick that user.')
   try {
   await mentionedMember.send(kickEmbed);
   } catch (err) {
    console.log(`I was unable to message the user.`);
      }
      try {
        await mentionedMember.kick(reason)
      } catch (err) {
        console.log(err)
        return message.channel.send("I was unable to kick the mentioned user")
      }
  }
}