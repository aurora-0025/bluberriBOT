const { MessageEmbed, Client } = require("discord.js")

const fs = require("fs");

const db = require("quick.db");



module.exports = {
    name: "setwelcomechannel",
    description: "sets the welcome channel ```usage: ;setwelcomechannel\n``` ```[aliases:swc]```",
    aliases: ['swc'],
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
            .setColor('#FF69B4')
            .setFooter('© axolotl network |this message will be deleted in 5 seconds');
            message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
            msg.delete(), 5000)) 
          }
     

        welcomeEmbed= new MessageEmbed()
        .setTitle('Set The Welcome Channel As The Current Channel')
        .setColor('RED')
        .setFooter('© axolotl network |this message will be deleted in 10 seconds');

        message.channel.send({embeds: [welcomeEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 10000)) 
        var welcomeChannel=message.channel.id;
        db.set(`${message.guild.id}_welcomeChannel`, welcomeChannel);

        
    }}