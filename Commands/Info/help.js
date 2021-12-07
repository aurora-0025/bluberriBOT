const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js")

const config = require("../../Data/config.json")

module.exports = {
  name: "help",
  description: "Help command for the bot \n" + "```" + "usage:" + config.prefix + "help" + "```",
  usage: `${config.prefix}help`,
  example: `${config.prefix}help`,
  aliases: ['help'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete()

    const emojis = {
      info: '📉',
      moderation: '🛠️',
      utilities: '⚙️',
      ticket: '🎫',
      giveaway: '🎉',
      fun: '🎮',

    }

    const directories = [...new Set(client.commands.map(cmd => cmd.directory))
    ];

    const formatSring = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands.filter(
        (cmd) => cmd.directory === dir
      ).map(cmd => {
        return {
          name: cmd.name || 'there is no name',
          description: cmd.description || 'there is no description',
          usage: cmd.usage || 'there is no usage',
          example: cmd.example || 'there is no example',
          aliases: cmd.aliases || ['there is no alias']
        }
      });

      return {
        directory: formatSring(dir),
        commands: getCommands,
      };
    });

    const embed = new MessageEmbed()
      .setAuthor(`Hi im ${client.user.username}, im your virtual assistant here in ${message.guild.name}\n choose the category you require help down below`)
      .setColor(config.accentColor)
      .setFooter(`requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }));

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu().setCustomId("help-menu")
          .setPlaceholder('SELECT A CATEGORY')
          .setDisabled(state)
          .addOptions(
            {
              label: 'CLOSE',
              value: 'close',
              emoji: '❌',
            }
          )
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category`,
                emoji: emojis[cmd.directory.toLowerCase() || null]
              };
            })
          )
      ),
    ];

    const initialMessage = await message.channel.send({
      embeds: [embed],
      components: components(false),
      ephermal: true 
    });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, componentType: "SELECT_MENU" });

    collector.on('collect', (interaction) => {
      if(interaction.values[0]==='close'){
       return initialMessage.delete()
      }
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLocaleLowerCase() === directory);
      const categoryEmbed = new MessageEmbed()
        .setTitle(`${directory} Commands`)
        .setDescription(`Here are the list of commands`)
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`;${cmd.name}\``,
              value: `${cmd.description}\n`+"```"+`USAGE:${cmd.usage}\nEXAMPLE${cmd.example}\nALIASES:[${cmd.aliases}]`+"```"  ,
            }
          })
        )
        .setColor(config.accentColor)
      interaction.update({ embeds: [categoryEmbed],ephermal: true  })
    });

    collector.on('end', () => {
      initialMessage.edit({ components: components(true), ephermal: true });
    })


  }
}