const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "setgiveawaychannel",
    description: "To set the giveaway channel",
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
        const giveawayChannel = interaction.guild.channels.cache.get(channel);
        if(giveawayChannel.type=='GUILD_CATEGORY'){
        lockEmbed= new MessageEmbed()
        .setTitle('⚠️You chose a category instead of channel')
        .setColor('RED')
        .setFooter(`© ${interaction.guild.name} | this message will be deleted in 5 seconds`)
        .setTimestamp();
      return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
      msg.delete(), 5000))
    }

        db.set(`${interaction.guild.id}_giveawayChannel`,giveawayChannel.id)

        setgiveawayEmbed= new MessageEmbed()
        .setDescription(`**Set The giveaway Channel to** ${giveawayChannel}`)
        .setColor('#FF69B4')
        .setFooter(`© ${interaction.guild.name}`);
        await interaction.followUp({embeds:[setgiveawayEmbed] }).then((msg)=>setTimeout(() => 
        msg.delete(), 10000)) 
    },
}