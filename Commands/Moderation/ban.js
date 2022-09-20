const { MessageEmbed } = require("discord.js");

const config = require("../../Data/config.json");

module.exports = {
    name: "ban",
    description: "To ban a user",
    usage: `${config.prefix}ban <mention> <reason>`,
    example: `${config.prefix}ban @user spamming in general`,
    aliases: ["ban"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️You dont have permission to do that")
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        function getUserFromMention(mention) {
            // The id is the first and only match found by the RegEx.
            const matches = mention.match(/^<@!?(\d+)>$/);

            // If supplied variable was not a mention, matches will be null instead of an array.
            if (!matches) return;

            // However, the first element in the matches array will be the entire mention, not just the ID,
            // so use index 1.
            const id = matches[1];
            if (message.member.id === id) {
                errEmbed = new MessageEmbed()
                    .setTitle("⚠️You cant ban yourself")
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                message.channel
                    .send({ embeds: [errEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }

            if (client.id === id) {
                errEmbed = new MessageEmbed()
                    .setTitle("⚠️You cant ban me")
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                message.channel
                    .send({ embeds: [errEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }

            return client.users.cache.get(id);
        }

        if (!args[0]) {
            noMentionEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please mention the user you want to ban and specify a ban reason.\n" +
                        "```" +
                        ";ban <mention> <reason>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 10 seconds`
                );

            return message.channel
                .send({ embeds: [noMentionEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }

        const user = getUserFromMention(args[0]);
        if (!user) {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️Maybe you mentioned a role Instead of User")
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            return message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        let member = message.guild.members.cache.get(user.id);
        if (
            member.permissions.has("ADMINISTRATOR") ||
            member.permissions.has("BAN_MEMBERS")
        ) {
            errEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️You cant ban this user |this message will be deleted in 5 seconds"
                )
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        if (!user) {
            invalidMentionEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please use a proper mention if you want to ban someone."
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );

            return message.channel
                .send({ embeds: [invalidMentionEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        var reason = args.slice(1).join(" ");
        if (!reason) {
            reason = "None";
        }

        try {
            await message.guild.members.ban(user, { reason });
        } catch (error) {
            failEmbed = new MessageEmbed()
                .setTitle(`⚠️Failed to ban **${user.tag}**: ${error}`)
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );

            return message.channel
                .send({ embeds: [failEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        banEmbed = new MessageEmbed()
            .setColor(config.accentColor)
            .setTitle(`${user.tag} Has Been **Banned** From The Server`)
            .addFields({
                name: "REASON",
                value: "**" + reason + "**",
                inline: true,
            })
            .setFooter(`© ${message.guild.name}`)
            .setTimestamp();

        return message.channel.send({ embeds: [banEmbed] });
    },
};
