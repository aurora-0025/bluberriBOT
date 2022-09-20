const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const config = require("../../Data/config.json");

module.exports = {
    name: "startgiveaway",
    description: "To start a giveaway",
    usage: `${config.prefix}startgiveaway <no of winners> <time(s|m|h|d|y)> <prize>`,
    example: `${config.prefix}startgiveaway 2 1d 100coins`,
    aliases: ["gstart"],
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
                .setFooter("©bluberri");
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        let winners = args[0];
        let time = args[1];
        let prize = args.slice(2).join(" ");

        if (!winners) {
            failEmbed = new MessageEmbed()
                .setTitle(`⚠️You did not enter the no. of winners.`)
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );

            return message.channel
                .send({ embeds: [failEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        if (!time) {
            failEmbed = new MessageEmbed()
                .setTitle(`⚠️You did not enter the time. in s|m|h|d|y`)
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );

            return message.channel
                .send({ embeds: [failEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        if (!prize) {
            failEmbed = new MessageEmbed()
                .setTitle(`⚠️You did not enter the prize.`)
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 5 seconds`
                );

            return message.channel
                .send({ embeds: [failEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        time = ms(time);

        let giveawayChannelID = db.get(`${message.guild.id}_giveawayChannel`);

        const giveawayChannel = message.member.guild.channels.cache.find(
            (c) => c.id == giveawayChannelID
        );

        const embed = new MessageEmbed()
            .setTitle("React with 🎉 to enter the giveaway!")
            .setDescription(
                `🏆Prize: **${prize}**\n 🕒Duration: **${ms(time, {
                    long: true,
                })}**\n 👤Hosted By: **${message.author.username}**`
            )
            .setThumbnail(
                "https://i.ibb.co/P98kzhD/Pngtree-giveaway-transparent-background-6408262-1.png"
            )
            .addField("STATUS", "ONGOING")
            .setColor(config.accentColor)
            .setFooter(`${winners} winners|Ends At`)
            .setTimestamp(Date.now() + time);

        const e = await giveawayChannel.send({
            content: "✨**GIVEAWAY**✨",
            embeds: [embed],
        });
        db.set(`${e.id}_giveaway`, {
            status: "ONGOING",
            winners: winners,
            prize: prize,
        });
        e.react("🎉");

        setTimeout(async () => {
            const status = db.get(`${e.id}_giveaway.status`);
            if (status == "ENDED") return;
            let reactions = await e.reactions.cache.get("🎉").users.fetch();
            reactions = await reactions.values();
            var reactUsers = [];
            for (const value of reactions) {
                if (!value.bot) {
                    reactUsers.push(value);
                }
            }
            if (reactUsers.length < winners) {
                const endembed = new MessageEmbed()
                    .setTitle("**GIVEAWAY HAS ENDED**")
                    .setDescription(
                        `🏆Prize: ${prize}\n 🕒Duration: ${ms(time, {
                            long: true,
                        })}\n 👤Hosted By: ${message.author.username}`
                    )
                    .setThumbnail(
                        "https://i.ibb.co/P98kzhD/Pngtree-giveaway-transparent-background-6408262-1.png"
                    )
                    .addField("STATUS", "ENDED")
                    .addField("REASON", `Not enough participants`)
                    .setColor("RED")
                    .setFooter("Ended At")
                    .setTimestamp();
                return e.edit({ embeds: [endembed] });
            }
            let w = [];

            for (let i = 1; i <= winners; i++) {
                w.push(
                    reactUsers[Math.floor(Math.random() * reactUsers.length)]
                );
            }
            const endembed = new MessageEmbed()
                .setTitle("✨**GIVEAWAY HAS ENDED**✨")
                .setDescription(
                    `Prize: **${prize}**\n Duration: **${ms(time, {
                        long: true,
                    })}**\n Hosted By: **${message.author.username}**`
                )
                .setThumbnail(
                    "https://i.ibb.co/P98kzhD/Pngtree-giveaway-transparent-background-6408262-1.png"
                )
                .addField("STATUS", "ENDED")
                .addField(
                    "WINNERS",
                    `🎉 ${prize} was won by the following participant(s):\n${w.join(
                        ","
                    )}`
                )
                .setColor(config.accentColor)
                .setFooter("Ended At")
                .setTimestamp();
            e.edit({ embeds: [endembed] });
        }, time);
    },
};
