const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
} = require("discord.js");

const config = require("../../Data/config.json");

module.exports = {
  name: "rockpaperscissors",
  description: "To play rock paper scissors with someone",
  usage: `${config.prefix}rockpaperscissors <mention>`,
  example: `${config.prefix}rockpaperscissors @user OR ${config.prefix}rockpaperscissors to play with bot`,
  aliases: ["rps"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    function checkWin(p1, p2) {
      drawEmbed = new MessageEmbed()
        .setDescription(`ITS A DRAW`)
        .setColor("ORANGE")
        .setFooter(`© ${message.guild.name}`);
      p1winEmbed = new MessageEmbed()
        .setDescription(`${p1.user}** won the game🎉✨**`)
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name}`);
      p2winEmbed = new MessageEmbed()
        .setDescription(`${p2.user}** won the game🎉✨**`)
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name}`);
      if (p1.choice == p2.choice)
        return message.channel.send({ embeds: [drawEmbed] });
      if (p1.choice == "rock" && p2.choice == "scissors")
        return message.channel.send({ embeds: [p1winEmbed] });
      if (p1.choice == "paper" && p2.choice == "rock")
        return message.channel.send({ embeds: [p1winEmbed] });
      if (p1.choice == "scissors" && p2.choice == "paper")
        return message.channel.send({ embeds: [p1winEmbed] });
      if (p2.choice == "rock" && p1.choice == "scissors")
        return message.channel.send({ embeds: [p2winEmbed] });
      if (p2.choice == "paper" && p1.choice == "rock")
        return message.channel.send({ embeds: [p2winEmbed] });
      if (p2.choice == "scissors" && p1.choice == "paper")
        return message.channel.send({ embeds: [p2winEmbed] });
    }
    message.delete();
    let target = message.mentions.users.first();
    let targetId;
    let userId = message.author.id;
    let noPlayers = 2;
    if (!target) {
      target = message.guild.me;
      noPlayers = 1;
      targetId = "CPU";
    } else {
      targetId = target.id;
    }

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("rock")
        .setLabel("✊ROCK")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setCustomId("paper")
        .setLabel("🖐PAPER")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setCustomId("scissors")
        .setLabel("✌SCISSORS")
        .setStyle("SECONDARY")
    );
    rpsEmbed = new MessageEmbed()
      .setTitle("ROCK PAPER SCISSORS SHOOT!")
      .setDescription(`${message.author} VS ${target}`)
      .setColor(config.accentColor)
      .setFooter(`© ${message.guild.name}`);
    message.channel.send({
      embeds: [rpsEmbed],
      components: [row],
    });
    const filter = async (interaction) => {
      if(!interaction.isButton()) return;

      if (
        (interaction.user.id == userId) == "pressed" ||
        (interaction.user.id == targetId) == "pressed"
      ) {
        interaction
          .reply({
            content: `${interaction.user.username} You already chose an option`,
            ephermal: true,
          })
          .then((msg) => setTimeout(() => msg.delete(), 3000));
        return false;
      }
      if (interaction.user.id == userId) {
        userId = "pressed";
        return true;
      }
      if (interaction.user.id == targetId) {
        targetId = "pressed";
        return true;
      } else {
        interaction.reply({ content: "You are not part of this game" });
        return false;
      }
    };

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: noPlayers,
    });

    collector.on("collect", (ButtonInteraction) => {
      if (noPlayers == 2) {
        waitEmbed = new MessageEmbed()
          .setDescription(`${ButtonInteraction.user} chose`)
          .setColor(config.accentColor)
          .setFooter(`© ${message.guild.name}`);
        message.channel
          .send({ embeds: [waitEmbed] })
          .then((msg) => setTimeout(() => msg.delete(), 3000));
      }
    });
    collector.on("end", (collected) => {
      if (collected.size == 2) {
        array = Array.from(collected, ([name, value]) => ({ name, value }));
        p1Choice = {
          user: array[0].value.user,
          choice: array[0].value.customId,
        };
        p2Choice = {
          user: array[1].value.user,
          choice: array[1].value.customId,
        };
        choiceEmbed = new MessageEmbed()
          .setDescription(
            `${p1Choice.user} chose **${p1Choice.choice}**\n${p2Choice.user} chose **${p2Choice.choice}**`
          )
          .setColor(config.accentColor)
          .setFooter(`© ${message.guild.name}`);
        message.channel.send({ embeds: [choiceEmbed] });
        checkWin(p1Choice, p2Choice);
      }
      if (collected.size == 1) {
        array = Array.from(collected, ([name, value]) => ({ name, value }));
        botChoices = ["rock", "paper", "scissors"];
        botChoice = {
          user: message.guild.me,
          choice: botChoices[Math.floor(Math.random() * botChoices.length)],
        };
        userChoice = {
          user: array[0].value.user,
          choice: array[0].value.customId,
        };
        choiceEmbed = new MessageEmbed()
          .setDescription(
            `${userChoice.user} chose **${userChoice.choice}**\n${botChoice.user} chose **${botChoice.choice}**`
          )
          .setColor(config.accentColor)
          .setFooter(`© ${message.guild.name}`);
        message.channel.send({ embeds: [choiceEmbed] });
        checkWin(botChoice, userChoice);
      }
    });
  },
};
