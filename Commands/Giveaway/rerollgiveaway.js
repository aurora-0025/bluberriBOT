const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const config = require("../../Data/config.json");

module.exports = {
    name: "rerollgiveaway",
    description: "To reroll a giveaway",
    usage: `${config.prefix}endgiveaway <giveaway message ID>`,
    example: `${config.prefix}endgiveaway 77565561243681`,
    aliases: ["greroll"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        const giveawayID = args[0];
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️You dont have permission to do that")
                .setColor("RED")
                .setFooter("©bluberri");
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }
        if (!giveawayID) {
            incorrectFormatEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please Use The Correct Format" +
                        "```" +
                        ";rerollgiveaway <giveaway message ID>" +
                        "```"
                )
                .setColor("RED")
                .setFooter("©bluberri");
            return message.channel
                .send({ embeds: [incorrectFormatEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        } else {
            try {
                let giveawayChannelID = db.get(
                    `${message.guild.id}_giveawayChannel`
                );
                const giveawayChannel =
                    message.member.guild.channels.cache.find(
                        (c) => c.id == giveawayChannelID
                    );
                const giveawayEmbed = await giveawayChannel.messages.fetch(
                    giveawayID
                );
                const data = giveawayEmbed.embeds[0];

                let reactions = await giveawayEmbed.reactions.cache
                    .get("🎉")
                    .users.fetch();
                reactions = await reactions.values();
                var reactUsers = [];
                for (const value of reactions) {
                    if (!value.bot) {
                        reactUsers.push(value);
                    }
                }
                let prize = db.get(`${giveawayID}_giveaway.prize`);
                let winners = db.get(`${giveawayID}_giveaway.winners`);
                let status = db.get(`${giveawayID}_giveaway.status`);
                if (status != "ENDED") {
                    errEmbed = new MessageEmbed()
                        .setTitle("⚠️You cant reroll an ongoing giveaway")
                        .setColor("RED")
                        .setFooter("©bluberri");
                    return message.channel
                        .send({ embeds: [errEmbed] })
                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                }
                w = [];

                for (let i = 1; i <= winners; i++) {
                    w.push(
                        reactUsers[
                            Math.floor(Math.random() * reactUsers.length)
                        ]
                    );
                }

                const rerollembed = new MessageEmbed()
                    .setTitle("✨**GIVEAWAY HAS BEEN REROLLED**✨")
                    .setDescription(data.description)
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
                giveawayEmbed.edit({ embeds: [rerollembed] });
                db.set(`${giveawayID}_giveaway.status`, "ENDED");
            } catch (error) {
                console.log(error);
                invalidMessageEmbed = new MessageEmbed()
                    .setTitle("⚠️That Giveaway Does Not Exist")
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
