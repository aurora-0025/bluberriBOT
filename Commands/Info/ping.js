const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
    name: "ping",
    description: "returns websocket ping \n ```usage: ;ping```",
    aliases: ["ping"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        pingEmbed = new MessageEmbed()
            .setTitle(`${client.ws.ping} ws ping`)
            .setColor(config.accentColor)
            .setFooter("©bluberri");

        message.channel.send({ embeds: [pingEmbed] });
    },
};
