const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");
const { options } = require("../..");
const config = require("../../Data/config.json")



module.exports = {
  name: "addRole",
  description: "To add role to the getRole",
  usage: `${config.prefix}addrole <role> <targetmessageid> <title> <description>`,
  example: `${config.prefix}addrole @role 7213892193001230 rolename roledescription`,
  aliases: ['ar'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete()
    if(!message.member.permissions.has("KICK_MEMBERS")){
      errEmbed= new MessageEmbed()
      .setTitle('⚠️You dont have permission to do that')
      .setColor('RED')
      .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
      message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
      msg.delete(), 5000)) 
    };
    const role = message.mentions.roles.first()
    if (!args[1]||!args[2]||!args[3]){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️ Please follow the correct format')
        .setColor('RED')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
        message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
      };
    const messageId = args[1]
    const targetMessage = await message.channel.messages.fetch(messageId, {
        cache:true,
        force:true
    })

    if(!targetMessage) {     
            errEmbed= new MessageEmbed()
            .setTitle('⚠️ Please use the command in the channel with the select menu')
            .setColor('RED')
            .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
            return  message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000)) 
          };
    if(targetMessage.author.id !== client.user?.id) {
        errEmbed= new MessageEmbed()
        .setTitle('⚠️ Please provide Id of message sent by me')
        .setColor('RED')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
        return  message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
    }

    let row = targetMessage.components[0]
    if (!row) {
        row = new MessageActionRow()
    }

    const option = [{
        label: args[2],
        value: role.id,
        description: args[3]
    }]

    let menu = row.component[0]
    if (menu) {
        for (const o of menu.options) {
            if (o.value === option[0].value) {
                return {
                    custom: true,
                    content: `<@&${o.value}> is already part of this menu`,
                    allowedMentions: {
                        roles: [],
                    },
                    ephermal: true
                }
            }
        }

        menu.addOptions(option)
        menu.setMaxValues(menu.options.length)
    } else {
        row.addComponents(
            new MessageSelectMenu()
                .setCustomId('roleselect')
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder('Select Your Roles')
                .addOptions([
                    {
                        label: 'Pick the roles:',
                        value: 'placeholder',
                        default: true,                
                    },])
        )
    }

    targetMessage.edit({
        components: [row], 
    })
    return {
        custom: true,
        content: `added <@&${role.id}> to the auto roles menu`,
        allowedMentions: {
            roles: [],
        },
        ephermal: true
    }
}
}