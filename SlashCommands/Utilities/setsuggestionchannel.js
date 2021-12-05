const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "setsuggestionchannel",
    description: "To set the suggestions channel",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "channel",
            description: "the channel to set as the giveaway channel",
            required: true,
            type: "CHANNEL",
            
        }
    ],  
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [channel] = args
        const suggestionsChannel = interaction.guild.channels.cache.get(channel);

        if(suggestionsChannel.type=='GUILD_CATEGORY'){
            lockEmbed= new MessageEmbed()
            .setTitle('⚠️You chose a category instead of channel')
            .setColor('RED')
            .setFooter(`© ${interaction.guild.name}| this message will be deleted in 5 seconds`)
            .setTimestamp();
          return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
          msg.delete(), 5000)) }
        db.set(`${interaction.guild.id}_suggestionsChannel`,suggestionsChannel.id)


        setsuggestionEmbed= new MessageEmbed()
        .setDescription(`**Set The Suggestions Channel to** ${suggestionsChannel}`)
        .setColor('#FF69B4')
        .setFooter(`© ${interaction.guild.name}| This message will be deleted in 10 seconds`);
        await interaction.followUp({embeds:[setsuggestionEmbed] }).then((msg)=>setTimeout(() => 
        msg.delete(), 10000)) 
    },
}