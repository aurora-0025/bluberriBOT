const { MessageEmbed, Client } = require("discord.js");

const config = require("../../Data/config.json");

const db = require("quick.db");

module.exports = {
    name: "denysuggestion",
    description:
        "To deny a suggestion ```usage: ;denysuggestion <suggestionID> <remark>\n[aliases:sdeny]```",
    aliases: ["sdeny"],
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
            return message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        const messageID = args[0];
        const denyQuery = args.slice(1).join(" ");
        if (!denyQuery) {
            denyQuery = "Nothing specified";
        }
        if (!messageID || !denyQuery) {
            incorrectFormatEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please Use The Correct Format" +
                        "```" +
                        ";denysuggestion <suggestionID> <remark>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);
            return message.channel
                .send({ embeds: [incorrectFormatEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }

        try {
            let suggestionsChannelID = db.get(
                `${message.guild.id}_suggestionsChannel`
            );
            const suggestionsChannel = message.member.guild.channels.cache.find(
                (c) => c.id == suggestionsChannelID
            );
            const suggestedEmbed = await suggestionsChannel.messages.fetch(
                messageID
            );
            const data = suggestedEmbed.embeds[0];
            const deniedEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.iconURL)
                .setTitle("SUGGESTION")
                .setColor("#FF0000")
                .setDescription(data.description)
                .setTimestamp()
                .addField("STATUS", "DENIED")
                .addField("REMARK", denyQuery)
                .setFooter(`© ${message.guild.name}`);

            suggestedEmbed.edit({ embeds: [deniedEmbed] });

            const user = await client.users.cache.find(
                (u) => u.tag === data.author.name
            );
            const dmDenyEmbed = new MessageEmbed()
                .setColor("RED")
                .setTitle(
                    `YOUR SUGGESTION HAS BEEN DENIED BY ${message.author.tag}`
                )
                .setFooter(`© ${message.guild.name}`);
            user.send({ embeds: [dmDenyEmbed] });
        } catch (error) {
            console.log(error);
            InvalidMessageEmbed = new MessageEmbed()
                .setTitle("⚠️That Suggestion Does Not Exist")
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            return message.channel
                .send({ embed: [InvalidMessageEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
    },
};
