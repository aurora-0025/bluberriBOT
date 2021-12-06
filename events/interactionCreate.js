const client = require("../index");
const db = require('quick.db')
const fs = require('fs')
const config = require("../Data/config.json")

const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow,
} = require('discord.js');

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND"|| option.type === 1) {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
        if (interaction.customId === 'classselect'){
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

        if (interaction.customId === 'roleselect'){
            await interaction.deferReply({ ephemeral: true });
            for (rolename of interaction.values){
            userId = interaction.user.id
            let guild = client.guilds.cache.get('916357864874979388');
            let member = guild.members.cache.get(userId);
            const memberRoles = member.roles

            const component = interaction.component 
            const removed = component.options.filter((option)=> {
                return !interaction.values.includes(option.value)
            })
            for(const id of interaction.values) {
                if(id!="placeholder"){
                    memberRoles.add(id);
                }
            }
            for(const id of removed) {
                if(id.value!="placeholder"){
                memberRoles.remove(id.value);
                }
            }
            }
            await interaction.followUp({
                content: `Updated Role[s]`,
                ephemeral: true
            })
            }

    //TICKET
    if (interaction.customId === 'tic') {
        let ticketName = db.get(`ticketName_${interaction.user.id}`)
        let ticketID = db.get(`ticketID_${interaction.user.id}_${interaction.guild.id}`)

    if (interaction.channel.id === ticketID){
        interaction.delete();
        
            errEmbed= new MessageEmbed()
            .setTitle('⚠️You cant create a ticket in this channel')
            .setColor('RED')
            .setFooter('©bluberri');
        
        let err = interaction.channel.send({embeds: [errEmbed]})
        setTimeout(()=>err.delete(),10000)
    }

    let ticketCategoryID = db.get(`${interaction.guild.id}_ticketCategory`)
    if (!(interaction.guild.channels.cache.find(c => c.parentId=== ticketCategoryID))){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️Please set a ticket channel category')
        .setColor('RED')
        .setFooter('©bluberri |this message will be deleted in 5 seconds');
      return  interaction.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
      msg.delete(), 5000)) 

    }
    if(!ticketCategoryID) {
        errEmbed= new MessageEmbed()
        .setTitle('⚠️Please set a ticket channel category')
        .setColor('RED')
        .setFooter('©bluberri |this message will be deleted in 5 seconds');
       return interaction.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
       msg.delete(), 5000)) 
    }
    cs1Role=interaction.guild.roles.cache.find(r => r.id=='916726140096376833')
    cs2Role=interaction.guild.roles.cache.find(r => r.id=='916726529969487922')
    repRole=interaction.guild.roles.cache.find(r => r.id=='916373393685762148')
    interaction.guild.channels.create(`ticket-${interaction.user.tag}`, 'text'
    ).then((channel)=>{
        db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, channel.name);
        db.set(`ticketID_${interaction.user.id}_${interaction.guild.id}`, channel.id);
        channel.setParent(ticketCategoryID);
        channel.permissionOverwrites.create(cs1Role, { VIEW_CHANNEL: false });
        channel.permissionOverwrites.create(cs2Role, { VIEW_CHANNEL: false });
        channel.permissionOverwrites.create(repRole, { VIEW_CHANNEL: false });
        channel.permissionOverwrites.create(interaction.user, { VIEW_CHANNEL: true });
        const embed = new MessageEmbed()
        .setDescription(
    `__Hello there ${interaction.user.tag} ,__ \n` +


    "> The staff will be here as soon as possible mean while tell us about your issue!\n" +

    "> Once the issue is resolved staff will close the ticket\n" +

    "> Thank You!"
)
        .setColor(config.accentColor)
        .setTimestamp()
        .setAuthor(interaction.guild.name, interaction.guild.iconURL({
            dynamic: true
        }));

    const del = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('del')
            .setLabel('🔒 Close Ticket!')
            .setStyle('SECONDARY'),
        );
        openTicketEmbed= new MessageEmbed()
        .setTitle('A ticket has been opened')
        .setColor(config.accentColor)
        .setFooter('©bluberri |this message will be deleted in 5 seconds')
        .setTimestamp();
 interaction.channel.send({embeds: [openTicketEmbed]}).then((msg)=>setTimeout(() => 
 msg.delete(), 5000)) 
    channel.send({
        content: `Welcome <@${interaction.user.id}>`,   
        embeds: [embed],
        components: [del]
    })
    console.log(`Created channel: ${channel.name}`);
    })
    } else if (interaction.customId === 'del') {
        interactionMember= interaction.channel.guild.members.cache.find(member => member.user.id == interaction.user.id)
        if(!interactionMember.permissions.has('MANAGE_MESSAGES'))
        {
            closeTicketEmbed= new MessageEmbed()
            .setTitle('⚠️You do not have the permission to do this')
            .setColor('RED')
            .setFooter('©bluberri |this message will be deleted in 5 seconds')
            .setTimestamp();
     return interaction.channel.send({embeds: [closeTicketEmbed]}).then((msg)=>setTimeout(() => 
     msg.delete(), 5000)) 
        }

        interaction.channel.delete();
    }
});
