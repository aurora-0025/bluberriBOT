const { MessageEmbed, Client } = require("discord.js")
const config = require("../../Data/config.json")

const db = require("quick.db")



module.exports = {
    name: "setticketcategory",
    description: "sets the ticket category channel to the category the command was send in",
    usage: `${config.prefix}setticketcategory`,
    example: `${config.prefix}setticketcategory`,
    aliases: ['stc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
        if(!message.member.permissions.has("ADMINISTRATOR")){
            errEmbed= new MessageEmbed()
            .setTitle('⚠️You dont have permission to do that')
            .setColor(config.accentColor)
            .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
          return  message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000))  
          }

        setticketEmbed= new MessageEmbed()
        .setTitle('Successfully Set The Catergory as the current one')
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name} |this message will be deleted in 10 seconds`)
message.channel.send({embeds: [setticketEmbed]}).then((msg)=>setTimeout(() => 
msg.delete(), 10000)) 
        var ticketCategory=message.channel.parent.id
        db.set(`${message.guild.id}_ticketCategory`,ticketCategory)
        
    }}