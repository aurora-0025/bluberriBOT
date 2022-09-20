const { MessageEmbed, Client } = require("discord.js");
const config = require("../../Data/config.json");

const db = require("quick.db");

module.exports = {
    name: "acceptsuggestion",
    description:
        "To accept a suggestion ```usage: ;acceptsuggestion <suggestionID> <remark>\n[aliases:saccept]```",
    aliases: ["saccept"],
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
        let acceptQuery = args.slice(1).join(" ");
        if (!acceptQuery) {
            acceptQuery = "Nothing specified";
        }
        if (messageID == undefined || acceptQuery == undefined) {
            incorrectFormatEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please Use The Correct Format" +
                        "```" +
                        ";acceptsuggestion <suggestionID> <remark>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);
            return message.channel
                .send({ embeds: [incorrectFormatEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        } else {
            try {
                let suggestionsChannelID = db.get(
                    `${message.guild.id}_suggestionsChannel`
                );
                const suggestionsChannel =
                    message.member.guild.channels.cache.find(
                        (c) => c.id == suggestionsChannelID
                    );
                const suggestedEmbed = await suggestionsChannel.messages.fetch(
                    messageID
                );
                const data = suggestedEmbed.embeds[0];
                const acceptedEmbed = new MessageEmbed()
                    .setAuthor(data.author.name, data.iconURL)
                    .setTitle("SUGGESTION")
                    .setColor("#7CFC00")
                    .setDescription(data.description)
                    .setTimestamp()
                    .addField("STATUS", "ACCEPTED")
                    .addField("REMARK", acceptQuery)
                    .setFooter(`© ${message.guild.name}`);

                suggestedEmbed.edit({ embeds: [acceptedEmbed] });

                const user = await client.users.cache.find(
                    (u) => u.tag === data.author.name
                );
                const dmAcceptEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(
                        `YOUR SUGGESTION HAS BEEN ACCEPTED BY ${message.author.tag}`
                    )
                    .setFooter(`© ${message.guild.name}`);
                user.send({ embeds: [dmAcceptEmbed] });
            } catch (error) {
                console.log(error);
                invalidMessageEmbed = new MessageEmbed()
                    .setTitle("⚠️That Suggestion Does Not Exist")
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                return message.channel
                    .send({ embed: [invalidMessageEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }
        }
    },
};
