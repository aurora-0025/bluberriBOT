const { MessageEmbed, Client } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
    name: "nuke",
    description: "nukes a channel",
    usage: `${config.prefix}nuke`,
    example: `${config.prefix}nuke`,
    aliases: ["nuke"],
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
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentId);
            ch.setPosition(message.channel.position);
            message.channel.delete();
            nukeEmbed = new MessageEmbed()
                .setTitle(`This channel got NUKED!`)
                .setImage(
                    "https://images2.minutemediacdn.com/image/upload/c_crop,h_1345,w_2000,x_0,y_0/v1555949079/shape/mentalfloss/581049-mesut_zengin-istock-1138195821.jpg"
                )
                .setColor(config.accentColor)
                .setFooter(`© ${message.guild.name}`)
                .setTimestamp();
            ch.send({ embeds: [nukeEmbed] });
        });
    },
};
