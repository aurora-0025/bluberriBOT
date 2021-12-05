const { MessageEmbed } = require("discord.js")


const db = require("quick.db");
const config = require("../../Data/config.json")

module.exports = {
    name: "unmute",
    description: "unmutes a user",
    usage: `${config.prefix}unmute <mention>`,
    example: `${config.prefix}unmute @user`,
    aliases: ['unmute'],
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
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name}`);
        message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000))  
      }

        const target = message.mentions.users.first();
        if (target) {
            
            let muteID = db.set(`${message.guild.id}_MuteRole`)
            let mainRole = message.guild.roles.cache.find(role => role.id === mainID);
            let muteRole = message.guild.roles.cache.find(role => role.id === muteID);
            let memberTarget= message.guild.members.cache.get(target.id);
 
            if(!memberTarget.roles.cache.some(r => r.id === muteID)){
                errEmbed= new MessageEmbed()
                .setTitle(`⚠️ ${memberTarget.tag} is not muted`)
                .setColor(config.accentColor)
                .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
                message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000))  
            };
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            unmuteEmbed= new MessageEmbed()
            .setTitle(`${memberTarget.user.tag} has been unmuted`)
            .setColor(config.accentColor)
            .setFooter(`© ${message.guild.name}`)
            .setTimestamp();
    
            message.channel.send({embeds: [unmuteEmbed]})        
        } else{
            InvalidMemberEmbed= new MessageEmbed()
            .setTitle('⚠️Cant find that member!'+"```"+'usage: ;unmute <mention>'+"```")
            .setColor('RED')
            .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`)
            message.channel.send({embeds: [InvalidMemberEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000)) 
        }
    }
}