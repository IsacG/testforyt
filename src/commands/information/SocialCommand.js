const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'information', []);
  }

  async run(client, message, args) {
    const youtubeEmbed = new Discord.MessageEmbed()
      .setTitle('CybosDev')
      .setURL('https://www.youtube.com/channel/UCwq7a6LLRd4FY6IxrIe3eHQ')
      .setThumbnail('https://yt3.ggpht.com/jvRthR9lPmoko4IKv5hLI0zYD9D6z_x-NJVfN7OiFGTupTS3qWA1Trn796lzsDqKEab5XESmMw=s600-c-k-c0x00ffffff-no-rj-rp-mo')
      .setColor('#b31217')
      .addField('Check out my Youtube Channel', 'Tutorials & Fun')
    const discordEmbed = new Discord.MessageEmbed()
      .setTitle('Join Cybos Entertainment')
      .setURL('https://discord.gg/M4PVa54svU')
      .setThumbnail("https://yt3.ggpht.com/jvRthR9lPmoko4IKv5hLI0zYD9D6z_x-NJVfN7OiFGTupTS3qWA1Trn796lzsDqKEab5XESmMw=s600-c-k-c0x00ffffff-no-rj-rp-mo")
      .setColor("#7289da")
      .addField('Join Cybos Entertainment', 'Giveaways, Updates, Fun, Community')
      .setTimestamp()
      .setFooter("Cybos Entertainment",'https://yt3.ggpht.com/jvRthR9lPmoko4IKv5hLI0zYD9D6z_x-NJVfN7OiFGTupTS3qWA1Trn796lzsDqKEab5XESmMw=s600-c-k-c0x00ffffff-no-rj-rp-mo')
    await message.channel.send(youtubeEmbed).catch(err => console.log(err));
    await message.channel.send(discordEmbed).catch(err => console.log(err));
  }
}