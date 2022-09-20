const config = require("../../Data/config.json");

const { MessageEmbed } = require("discord.js");

const db = require("quick.db");

module.exports = {
    name: "setmuterole",
    description:
        "To set the muterole\n ```usage: ;setmuterole <muteroleID>\n[aliases:smr]```",
    usage: `${config.prefix}setmuterole <muteroleID>`,
    example: `${config.prefix}setmuterole 7882030242380`,
    aliases: ["smr"],

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
                .setFooter(`© ${message.guild.name}`);
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        if (!args[0]) {
            invalidFormatEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please enter a role ID:\n" +
                        "```" +
                        ";setmuterole <muteroleID>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);

            message.channel
                .send({ embeds: [invalidFormatEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        } else {
            var muterole = message.guild.roles.cache.find(
                (r) => r.id === args[0]
            );

            if (!muterole) {
                invalidIDEmbed = new MessageEmbed()
                    .setTitle(
                        "⚠️Please enter a valid Role ID:\n" +
                            "```" +
                            ";setmuterole <muteroleID>" +
                            "```"
                    )
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );

                message.channel
                    .send({ embeds: [invalidIDEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 10000));
            } else {
                setroleEmbed = new MessageEmbed()
                    .setTitle("Sucessfully set the mute role")
                    .setColor("GREEN")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 10 seconds`
                    );

                message.channel
                    .send({ embeds: [setroleEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 10000));

                db.set(`${message.guild.id}_MuteRole`, args[0]);
            }
        }
    },
};
