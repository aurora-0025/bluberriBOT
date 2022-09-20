const { MessageEmbed } = require("discord.js");

const config = require("../../Data/config.json");

module.exports = {
    name: "banlist",
    description: "To list all banned  users",
    usage: `${config.prefix}listban`,
    example: `${config.prefix}listban`,
    aliases: ["lban"],
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

        const listBans = await message.guild.bans.fetch();
        const bannedMembers = listBans
            .map(
                (b) =>
                    `\`${b.user.username}: ${b.user.id} was banned for ${b.reason}\``
            )
            .join("\n");
        bansEmbed = new MessageEmbed()
            .setTitle("Here are all the banned members in the server")
            .setDescription(bannedMembers)
            .setColor(config.accentColor)
            .setFooter(`© ${message.guild.name}`)
            .setTimestamp();
        message.channel.send({ embeds: [bansEmbed] });
    },
};
