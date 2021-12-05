const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
  name: "verify",
  description: "send verify message",
  usage: `${config.prefix}verify`,
  aliases: ["verify"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    pingEmbed = new MessageEmbed()
      .setDescription(`__**Welcome to CSE Discord**__
      Please take a minute to read our server guidelines on rules channel <#916632480012976139>  before verification.
      
      =========================================================
                           `+"```ini\n"+'[Please enter your name to bluberriBOT in your DM to unlock all the channels]'+"```"+`
      ========================================================= `)
      .setColor(config.accentColor)
      .setFooter("© bluberri");

    message.channel.send({ embeds: [pingEmbed] });
  },
};