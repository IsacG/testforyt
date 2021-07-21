const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js');
const ms = require('ms')

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to execute this command.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I require \`BAN_MEMBERS\` permission.");

    //Variables:
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason =  args.slice(2).join(" ");
    let time = args[1];
    const banEmbed = new discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .addField(`Reason: ${reason}` `Duration: ${time}`)
      .setColor("#add8e6")
      .setTimestamp()

    //Input Checking:
    if (!args[0]) return message.channel.send("You must state a user to tempban. \`-tempban @user time reason\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");
    if (!mentionedMember.bannable) return message.channel.send("You cannot ban this user.");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot tempban someone the same role or higher than you.');
    if (!reason) reason = 'No reason given.';
    if (!time) return message.channel.send("You must state a duration to tempban a user. \`-tempban @user 7d reason\`");

    //Executing:
    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err));

    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans =>{
        if (bans.size == 0) return message.channel.send("This server does not have any user banned yet.");
        let bannedUser = bans.find(b => b.user.id == mentionedMember.id);
        if (!bannedUser) return console.log('User Unbanned.')
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      })
    }. ms(time));
  }
}