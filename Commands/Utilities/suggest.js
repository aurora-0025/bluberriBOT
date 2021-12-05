const { MessageEmbed } = require("discord.js")


const db = require("quick.db")
const config = require("../../Data/config.json")

module.exports = {
    name: "suggest",
    description: "To make a suggestion ```usage: ;suggest\n[aliases:sg]```",
    aliases: ['sg'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
    if(!message.member.permissions.has("SEND_MESSAGES")){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️You dont have permission to do that')
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
       return message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000))  
      }

        const suggestionQuery= args.join(" ")
        noSuggestionEmbed= new MessageEmbed()
        .setTitle(`⚠️Please specify a suggesion`)
        .setThumbnail(message.member.user.avatarURL({dynamic: true }))
        .setColor('RED')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
        if(!suggestionQuery) return message.channel.send({embeds:[noSuggestionEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 

        suggestionEmbed= new MessageEmbed()
        .setAuthor(`${message.author.tag}`,`${message.author.avatarURL({dynamic: true})}`)
        .setTitle('SUGGESTION')
        .setDescription(`**${suggestionQuery}**`)
        .setColor(config.accentColor)
        .addField('STATUS', "PENDING")
        .setFooter(`© ${message.guild.name}`);

        let suggestionsChannelID = db.get(`${message.guild.id}_suggestionsChannel`,suggestionsChannel)
        const suggestionsChannel = message.member.guild.channels.cache.find(c => c.id== suggestionsChannelID)
        suggestionsChannel.send({embeds:[suggestionEmbed]}).then((msgembed)=>{
            msgembed.react('👍').then(()=>msgembed.react('👎'))
        })

        submittedSuggestionEmbed= new MessageEmbed()
        .setTitle('Suggestion Submitted')
        .setThumbnail(message.member.user.avatarURL({dynamic: true }))
        .setColor(config.accentColor)
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);

        message.channel.send({embeds: [submittedSuggestionEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
    }


}