const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
  name: "getrole",
  description: "send get role message",
  usage: `${config.prefix}getrole`,
  aliases: ["gr"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    pingEmbed = new MessageEmbed()
      .setTitle('Choose from the menu claim the required role')
      .setDescription("```"+`Note: You will be pinged if required on the bases of the roles you claim`+"```")
      .setColor(config.accentColor)
      .setFooter("© bluberri", client.user.avatarURL());

    message.channel.send({ embeds: [pingEmbed] });
  },
};