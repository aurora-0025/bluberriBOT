const { MessageEmbed, Client } = require("discord.js")
const db = require("quick.db")
const config = require("../../Data/config.json")

module.exports = {
    name: "setgiveawaychannel",
    description: "sets the giveaway channel ```usage: ;setgiveawaychannel\n``` ```[aliases:sgc]```",
    aliases: ['sgc'],
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
            .setFooter('©bluberri |this message will be deleted in 5 seconds');
            message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000))  
          }
       

        setgiveawayEmbed= new MessageEmbed()
        .setTitle('Set The Giveaway Channel As The Current Channel')
        .setColor(config.accentColor)
        .setFooter('©bluberri |this message will be deleted in 10 seconds');

     message.channel.send({embeds: [setgiveawayEmbed]}).then((msg)=>setTimeout(() => 
     msg.delete(), 10000)) 

        var giveawayChannel=message.channel.id;
          db.set(`${message.guild.id}_giveawayChannel`,giveawayChannel)  
    }}