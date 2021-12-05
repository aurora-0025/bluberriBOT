const { Client, CommandInteraction, MessageEmbed, User } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "banlist",
    description: "To see the list of banned members",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)

            if(!interactionMember.permissions.has("BAN_MEMBERS")){
                errEmbed= new MessageEmbed()
                .setTitle('⚠️You dont have permission to do that')
                .setColor('RED')
                .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000)) 
              };
          
          const listBans = await interaction.guild.bans.fetch();
          const bannedMembers = listBans.map((b)=>`\`${b.user.username}: ${b.user.id} was banned for ${b.reason}\``).join('\n')
          bansEmbed= new MessageEmbed()
          .setTitle('Here are all the banned members in the server')
          .setDescription(bannedMembers)
          .setColor('#FF69B4')
          .setFooter(`© ${interaction.guild.name}`)
          .setTimestamp();
          interaction.followUp({embeds: [bansEmbed]})
        

    }
}