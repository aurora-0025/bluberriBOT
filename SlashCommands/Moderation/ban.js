const { Client, CommandInteraction, MessageEmbed, User } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "ban",
    description: "To set the ban a member",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "member",
            description: "the member to ban from server.",
            required: true,
            type: "USER",
        },
        {
            name: "reason",
            description: "the reason for baning",
            required: false,
            type: "STRING",
        },
    ],  
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

let [member,reason] = args
const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)

if(!reason){
    reason="none"
}

console.log(member);
const banMember=interaction.guild.members.cache.get(member)

if(!interactionMember.permissions.has("BAN_MEMBERS")){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You dont have permission to do that')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) 
}

if(banMember.id==interaction.guild.me.id){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant ban me')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) };
if(banMember.id==interactionMember.id){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant ban yourself')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000)) };


if(banMember.permissions.has("ADMINISTRATOR")||banMember.permissions.has("BAN_MEMBERS")){
    errEmbed= new MessageEmbed()
    .setTitle('⚠️You cant ban this user')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name}`);
   return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
    msg.delete(), 5000))
  }
else{
  try {
    await interaction.guild.members.ban(banMember, { reason });
} catch (error) {
failEmbed= new MessageEmbed()
.setTitle(`⚠️Failed to ban **${banMember.user.username}**: ${error}`)
.setColor('RED')
.setFooter(`© ${interaction.guild.name}`);

return interaction.followUp({embeds: [failEmbed]}).then((msg)=>setTimeout(() => 
msg.delete(), 5000)) 
}
banEmbed= new MessageEmbed()
.setColor('#FF69B4')
.setTitle(`${banMember.user.username} Has been **Banned** from the server`)
.addFields(
  { name: 'REASON', value:"**"+reason+"**", inline: true },)
  .setFooter(`© ${interaction.guild.name}`)
  .setTimestamp();

return interaction.followUp({embeds:[banEmbed]});
}

    }

}