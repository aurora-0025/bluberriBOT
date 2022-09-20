const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const config = require("../../Data/config.json");

const db = require("quick.db");

module.exports = {
    name: "mute",
    description: "mutes the mentioned user",
    usage: `${config.prefix}mute <mention> <time s|m|h|d|y> <reason>`,
    example: `${config.prefix}mute @example 1d pinging staff`,
    aliases: ["mute"],

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            errEmbed = new MessageEmbed()
                .setTitle("⚠️You dont have permission to do that")
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);
            message.channel
                .send({ embeds: [errEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 5000));
        }

        muteRoleID = db.get(`${message.guild.id}_MuteRole`);
        if (!muteRoleID) {
            roleNotSetEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Please set a valid mute Role ID:" +
                        "```" +
                        ";setmuterole <muteroleID>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(`© ${message.guild.name}`);

            return message.channel
                .send({ embeds: [roleNotSetEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }

        const target = message.mentions.users.first();
        if (target) {
            let muteRole = message.guild.roles.cache.find(
                (role) => role.id === muteRoleID
            );
            if (!muteRole) {
                roleNotSetEmbed = new MessageEmbed()
                    .setTitle(
                        "⚠️Please set a valid mute Role ID:" +
                            "```" +
                            ";setmuterole <muteroleID>" +
                            "```"
                    )
                    .setColor("RED")
                    .setFooter(`© ${message.guild.name}`);

                return message.channel
                    .send({ embeds: [roleNotSetEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 10000));
            }
            var reason = args.slice(2).join(" ");
            if (!reason) {
                reason = "None";
            }
            let memberTarget = message.guild.members.cache.get(target.id);
            if (target.id === client.id) {
                errEmbed = new MessageEmbed()
                    .setTitle("⚠️You cant mute me")
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                message.channel
                    .send({ embeds: [errEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }

            if (target.id === message.member.id) {
                errEmbed = new MessageEmbed()
                    .setTitle("⚠️You cant mute yourself")
                    .setColor("RED")
                    .setFooter(
                        `© ${message.guild.name} |this message will be deleted in 5 seconds`
                    );
                message.channel
                    .send({ embeds: [errEmbed] })
                    .then((msg) => setTimeout(() => msg.delete(), 5000));
            }

            if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                muteEmbed = new MessageEmbed()
                    .setTitle(`${memberTarget.user.tag} has been muted`)
                    .setColor(config.accentColor)
                    .setFooter(`© ${message.guild.name}`)
                    .setTimestamp();
                message.channel.send({ embeds: [muteEmbed] });
                return;
            } else {
                memberTarget.roles.add(muteRole.id);
                timeMuteEmbed = new MessageEmbed()
                    .setTitle(
                        `${memberTarget.user.tag} has been muted for ${ms(
                            ms(args[1])
                        )}`
                    )
                    .setColor(config.accentColor)
                    .setFooter(`© ${message.guild.name}`)
                    .addField("Reason", reason)
                    .setTimestamp();
                message.channel.send({ embeds: [timeMuteEmbed] });

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                }, ms(args[1]));
            }
        } else {
            InvalidMemberEmbed = new MessageEmbed()
                .setTitle(
                    "⚠️Cant find that member!" +
                        "```" +
                        "\n;mute <mention> <time in s,m,h,d,y>" +
                        "```"
                )
                .setColor("RED")
                .setFooter(
                    `© ${message.guild.name} |this message will be deleted in 10 seconds`
                );
            message.channel
                .send({ embeds: [InvalidMemberEmbed] })
                .then((msg) => setTimeout(() => msg.delete(), 10000));
        }
    },
};
