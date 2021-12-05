const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "setticketcategory",
    description: "To set the ticket category",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "category",
            description: "the category to set as the ticket category",
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
        const [category] = args
        console.log(category);
        const ticketCategory = interaction.guild.channels.cache.get(category);
        if(ticketCategory.type=='GUILD_CATEGORY'){
        db.set(`${interaction.guild.id}_ticketCategory`,ticketCategory.id)
        setticketEmbed= new MessageEmbed()
        .setDescription(`**Set The Ticket Category to** ${ticketCategory}`)
        .setColor('#FF69B4')
        .setFooter(`© ${interaction.guild.name}`);
        }
        else{
        setticketEmbed= new MessageEmbed()
            .setDescription(`⚠️**Please Select A Category**`)
            .setColor('RED')
            .setFooter(`© ${interaction.guild.name}| This message will be deleted in 5 seconds`);
        }



        await interaction.followUp({embeds:[setticketEmbed] }).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
    },
}