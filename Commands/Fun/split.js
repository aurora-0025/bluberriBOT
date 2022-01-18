const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    ButtonInteraction,
  } = require("discord.js");
  
  const config = require("../../Data/config.json");
  
  module.exports = {
    name: "split",
    description: "To play split",
    usage: `${config.prefix}split <mention>`,
    example: `${config.prefix}split @user`,
    aliases: ["sp"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
    }
}