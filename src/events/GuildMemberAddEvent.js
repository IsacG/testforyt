// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const Discord = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const role = member.guild.roles.cache.get('864935673333153842');
    await member.roles.add(role.id).catch(err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.get('867200329819619389');
    const ruleChannel = member.guild.channels.cache.get('867201840001449994');
    welcomeChannel.send(`<@${member.user.id}>, welcome to ${member.guild.name}. Read the rules: ${ruleChannel}`);
  }
}
