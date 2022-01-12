const {
  Message,
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const config = require("../../Data/config.json");
const db = require("quick.db");

module.exports = {
  name: "getrole",
  description: "send get role message",
  usage: `${config.prefix}getrole`,
  aliases: ["gr"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    getRoleEmbed = new MessageEmbed()
      .setTitle("Choose from the menu to claim the required role")
      .setDescription(
        "```" +
          `Note: You will be pinged if required on the bases of the roles you claim` +
          "```"
      )
      .setColor(config.accentColor)
      .setFooter("© bluberri", client.user.avatarURL());

    console.log(db.get(`${message.guild.id}_roleOptions`));

    const proRoleRow = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("roleselect")
        .setMinValues(1)
        .setMaxValues(6)
        .setPlaceholder("Pick Your Roles From here")
        .addOptions([
          {
            label: "Pick the roles:",
            value: "placeholder",
            description: "Professional Bodies",
            default: true,
          },
          {
            label: "IEEE",
            value: "917432910322208839",
            description: "Institute of Electrical and Electronics Engineers",
          },
          {
            label: "CSI",
            value: "917433024478597240",
            description: "Computer Society of India",
          },
          {
            label: "FOSS",
            value: "917433090740191232",
            description: "Free and Open Source Software",
          },
          {
            label: "CySe",
            value: "917433202426142771",
            description: "Cyber Security",
          },
          {
            label: "Opla.AI",
            value: "917451918916349982",
            description: "OpenLabs.AI",
          },
          {
            label: "GDSC",
            value: "930778320231088198",
            description: "Google Developer Students Club",
          },
        ])
    );

    message.channel.send({ embeds: [getRoleEmbed] });

    message.channel.send({
      content: `**PROFESSIONAL BODIES**`,
      components: [proRoleRow],
    });
  },
};
