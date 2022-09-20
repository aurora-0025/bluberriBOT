const { Client, CommandInteraction, MessageEmbed, User } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "kick",
    description: "To set the kick a member",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "member",
            description: "the member to kick from server.",
            required: true,
            type: "USER",
        },
        {
            name: "reason",
            description: "the reason for kicking",
            required: false,
            type: "STRING",
        }
    ],  
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
let [member,reason] = args
if(!reason){
    reason="none"
}
const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)
const kickMember= interaction.guild.members.cache.get(member)
 if(!interactionMember.permissions.has("KICK_MEMBERS")){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You dont have permission to do that')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) 
}
else if(kickMember.id==interaction.guild.me.id){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant kick me')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) }
else if(kickMember.id==interactionMember.id){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant kick yourself')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) }


else if(kickMember.permissions.has("ADMINISTRATOR")||kickMember.permissions.has("KICK_MEMBERS")){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant kick this user')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name}`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000))
  }
else{
  try {
    await interaction.guild.members.kick(kickMember, { reason });
} catch (error) {
failEmbed= new MessageEmbed()
.setTitle(`⚠️Failed to kick **${kickMember.user.username}**: ${error}`)
.setColor('RED')
.setFooter(`© ${interaction.guild.name}`);

return interaction.followUp({embeds: [failEmbed]}).then((msg)=>setTimeout(() => 
msg.delete(), 5000)) 
}
kickEmbed= new MessageEmbed()
.setColor('#FF69B4')
.setTitle(`${kickMember.user.username} Has Been **Kicked** From The Server`)
.addFields(
  { name: 'REASON', value:"**"+reason+"**", inline: true },)
  .setFooter(`© ${interaction.guild.name}`)
  .setTimestamp();

return interaction.followUp({embeds:[kickEmbed]});
}
    }

}