const { MessageEmbed, Client } = require("discord.js")
const config = require("../../Data/config.json")

module.exports = {
    name: "unlock",
    description: "unlocks a channel",
    usage: `${config.prefix}unlock`,
    example: `${config.prefix}unlock`,
    aliases: ['unlock'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
        if(!message.member.permissions.has("MANAGE_CHANNELS")){
            errEmbed= new MessageEmbed()
            .setTitle('⚠️You dont have permission to do that')
            .setColor('RED')
            .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
          return  message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000))  
          }

        const roles = message.guild.roles.everyone;
    try{
        if(message.channel.permissionsFor(roles).bitfield===521942713921n){
        message.channel.permissionOverwrites.edit(roles, { SEND_MESSAGES: true });
        lockEmbed= new MessageEmbed()
        .setTitle('🔓unlocked the channel')
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name}`)
        .setTimestamp();
      return  message.channel.send({embeds: [lockEmbed]})}
      else{
        noLockEmbed= new MessageEmbed()
        .setTitle('🔓 This channel is not locked')
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name}`)
        .setTimestamp();
          message.channel.send({embeds: [nolockEmbed]})
      }
    }
    catch(e){
        console.log(e);
    }

    }
    }