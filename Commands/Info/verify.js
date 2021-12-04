const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
  name: "verify",
  description: "returns websocket ping",
  usage: `${config.prefix}ping`,
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
      .setDescription(`Welcome to CSE Discord.
      Please take a minute to read our discord guidelines on rules channel <#916632480012976139>  before verification.
      
      =========================================================
                           **Please enter your name to bluberriBOT in your DM to unlock all the channels**
      ========================================================= `)
      .setColor(config.accentColor)
      .setFooter("© bluberri");

    message.channel.send({ embeds: [pingEmbed] });
  },
};