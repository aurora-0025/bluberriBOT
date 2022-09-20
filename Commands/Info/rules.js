const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
    name: "rules",
    description: "to send the rules message",
    usage: `${config.prefix}rules`,
    aliases: ["rules"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();

        ruleEmbed = new MessageEmbed()
            .setTitle("Rules!")
            .setColor(config.accentColor)
            .setFooter("© bluberri")
            .addFields(
                {
                    name: "Follow Discord's TOS",
                    value:
                        "```ini" +
                        `
[https://discordapp.com/terms
https://discordapp.com/guidelines]
` +
                        "```",
                },
                {
                    name: "Be respectful with all members",
                    value:
                        "```ini" +
                        `
[Be respectful to others , No death threats, sexism, hate speech, racism
No doxxing, swatting, witch hunting]
` +
                        "```",
                },
                {
                    name: "No Advertising",
                    value:
                        "```ini" +
                        `
[Includes DM Advertising. We do not allow advertising here of any kind.]
` +
                        "```",
                },
                {
                    name: "No NSFW content",
                    value:
                        "```ini" +
                        `
[Anything involving gore or sexual content is not allowed.
NSFW = Not Safe for Work]
` +
                        "```",
                },
                {
                    name: "No spamming in text or VC",
                    value:
                        "```ini" +
                        `
[Do not spam messages, soundboards, voice changers, or earrape in any channel.]
` +
                        "```",
                },
                {
                    name: "No malicious content",
                    value:
                        "```ini" +
                        `
[No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban.]
` +
                        "```",
                },
                {
                    name: "Emoji Rules",
                    value:
                        "```ini" +
                        `
[No NSFW allowed
No racism]
` +
                        "```",
                }
            );

        message.channel.send({
            content: `
    Welcome to CSE!

    Invite Link:-https://discord.gg/PUvQk9Ehjc`,
            embeds: [ruleEmbed],
        });
    },
};
