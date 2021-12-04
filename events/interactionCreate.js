const client = require("../index");

const {
  Client,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }

  if (interaction.isSelectMenu()) {
    if (!interaction.customId === 'classselect') return;
    await interaction.deferReply({ ephemeral: false });
    let classname =interaction.values[0]
    userId = interaction.user.id
    let guild = client.guilds.cache.get('916357864874979388');
    let member = guild.members.cache.get(userId);
    const memberRoles = member.roles
    cs1RoleId = '916726140096376833'
    cs2RoleId = '916726529969487922'
    if(classname == 'cs1'){
      if(memberRoles.cache.has(cs2RoleId)){
        memberRoles.remove(cs2RoleId)
        memberRoles.add(cs1RoleId)
        interaction.followUp(`you have been given CS1 role`)
      }
      if(memberRoles.cache.has(cs1RoleId)){
        return;
      }
      else {
        memberRoles.add(cs1RoleId)
        interaction.followUp(`you have been given CS1 role`)
      }
    }

    if(classname == 'cs2'){
      if(memberRoles.cache.has(cs1RoleId)){
        memberRoles.remove(cs1RoleId)
        memberRoles.add(cs2RoleId)
        interaction.followUp(`you have been given CS2 role`)
      }
      if(memberRoles.cache.has(cs2RoleId)){
        return;
      }
      else {
        memberRoles.add(cs2RoleId)
        interaction.followUp(`you have been given CS2 role`)
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
