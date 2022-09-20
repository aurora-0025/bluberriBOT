const { MessageEmbed, Client } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
    name: "lock",
    description: "locksdown a channel",
    usage: `${config.prefix}lock`,
    example: `${config.prefix}lock`,
    aliases: ["lock"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
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

        const roles = message.guild.roles.everyone;
        try {
            message.channel.permissionOverwrites.edit(roles, {
                SEND_MESSAGES: false,
            });
            lockEmbed = new MessageEmbed()
                .setTitle("🔒Locked the channel")
                .setColor(config.accentColor)
                .setFooter(`© ${message.guild.name}`)
                .setTimestamp();
            return message.channel.send({ embeds: [lockEmbed] });
        } catch (e) {
            console.log(e);
        }
    },
};
