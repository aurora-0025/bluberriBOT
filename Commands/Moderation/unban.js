const { MessageEmbed } = require("discord.js");

const config = require("../../Data/config.json");

module.exports = {
    name: "unban",
    description: "To unban a user",
    usage: `${config.prefix}unban <userID>`,
    example: `${config.prefix}unban 781277788623789`,
    aliases: ["unban"],
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
            return message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            errEmbed = new MessageEmbed()
                .setTitle(
                    `⚠️**${message.author.username}**, I do not have perms to unban someone`
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 10 seconds`
                );
            return message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }

        let userID = args[0];
        if (!userID) {
            invalidMentionEmbed = new MessageEmbed()
                .setTitle(
                    `⚠️Please enter a userID to unban someone\`${config.prefix}unban <userID>\`\n use \`${config.prefix}banlist\` to find the id of banned members`
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 10 seconds`
                );

            return message.channel
                .send({ embeds: [invalidMentionEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }
        message.guild.bans.fetch().then((bans) => {
            if (bans.size == 0) return;
            let bUser = bans.find((b) => b.user.id == userID);
            if (!bUser) {
                invalidMentionEmbed = new MessageEmbed()
                    .setTitle(
                        `⚠️Please enter a valid userID to unban someone \`${config.prefix}unban <userID>\`\n use \`${config.prefix}banlist\` to find the id of banned members`
                    )
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 10 seconds`
                    );

                return message.channel
                    .send({ embeds: [invalidMentionEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 10000));
            }
            unbanEmbed = new MessageEmbed()
                .setTitle(`**${bUser.user.username}**has been unbanned`)
                .setColor(config.accentColor)
                .setFooter(`© ${message.guild.username}`)
                .setTimestamp();
            message.channel.send({ embeds: [unbanEmbed] });
            message.guild.members.unban(bUser.user);
        });
    },
};
