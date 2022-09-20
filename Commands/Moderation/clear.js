const { MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

module.exports = {
    name: "clear",
    description: "To clear upto 300 messages",
    usage: `${config.prefix}clear <amount>`,
    example: `${config.prefix}clear 100`,
    aliases: ["cl"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
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
        let amount = parseInt(args[0]) + parseInt(1);
        if (!amount) {
            errEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please enter the amount of messages to be deleted "
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        else if (amount <= 100) {
            message.channel.bulkDelete(amount, true);
            clearEmbed = new MessageEmbed()
                .setTitle(`Successfully cleared ${amount} messages `)
                .setColor("GREEN")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            return await message.channel
                .send({ embeds: [clearEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        } else if (amount <= 200) {
            inter.channel.bulkDelete(100, true);
            let left = amount - 100;
            setTimeout(async () => {
                message.channel.bulkDelete(left, true);
                clearEmbed = new MessageEmbed()
                    .setTitle(`Successfully cleared ${amount} messages `)
                    .setColor("GREEN")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                return await message.channel
                    .send({ embeds: [clearEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }, 2000);
        } else if (amount <= 300) {
            message.channel.bulkDelete(100, true);
            setTimeout(() => {
                message.channel.bulkDelete(100, true);
            }, 1500);
            let left = amount - 200;
            setTimeout(async () => {
                message.channel.bulkDelete(left, true);
                clearEmbed = new MessageEmbed()
                    .setTitle(`Successfully cleared ${amount} messages `)
                    .setColor("GREEN")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                return await message.channel
                    .send({ embeds: [clearEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }, 1500);
        } else {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️Can only delete upto 300 messages")
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
    },
};
