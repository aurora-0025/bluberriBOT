const { MessageEmbed, Client } = require("discord.js");

const db = require("quick.db");
const config = require("../../Data/config.json");

module.exports = {
    name: "setsuggestionchannel",
    description:
        "sets the suggestion channel ```usage: ;setsuggestionchannel\n[aliases:ssc]```",
    aliases: ["ssc"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️You dont have permission to do that")
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            return message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        setsuggestionEmbed = new MessageEmbed()
            .setTitle("Set The Suggestions Channel As The Current Channel")
            .setColor(config.accentColor)
            .setFooter(
                `© ${message.guild.name} |this message will be deleted in 10 seconds`
            );

        message.channel
            .send({ embeds: [setsuggestionEmbed] })
            .then((msg) => setTimeout(() => msg.delete(), 10000));

        var suggestionsChannel = message.channel.id;
        db.set(`${message.guild.id}_suggestionsChannel`, suggestionsChannel);
    },
};
