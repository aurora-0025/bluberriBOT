const { Client, CommandInteraction, MessageEmbed} = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "clear",
    description: "To clear messages from a channel",
    type: "CHAT_INPUT", 
    options:[
        {
        name:"channel",
        description:"The channel to clear messages",
        type: "CHANNEL",
        required:true,
    },
    {
        name:"amount",
        description:"The number of messages to clear",
        type: "NUMBER",
        required:true,
    },
],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
const [channel,amount] = args
clearchannel = interaction.guild.channels.cache.get(channel)
if(clearchannel.type=='GUILD_CATEGORY'){
    lockEmbed= new MessageEmbed()
    .setTitle('⚠️You chose a category instead of channel')
    .setColor('RED')
    .setFooter(`© ${interaction.guild.name}`)
    .setTimestamp();
  return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
  msg.delete(), 5000)) }
const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)

    if(!interactionMember.permissions.has("MANAGE_MESSAGES")){
                errEmbed= new MessageEmbed()
                .setTitle('⚠️You dont have permission to do that')
                .setColor('RED')
                .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000)) 
              };
              if(amount <= 100){
                clearchannel.bulkDelete(amount, true)
                clearEmbed= new MessageEmbed()
                .setTitle(`Successfully cleared ${amount} messages `)
                .setColor('GREEN')
                .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
              return await interaction.followUp({embeds: [clearEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000)) 
            }
            else if(amount <=200){
                inter.channel.bulkDelete(100, true)
                let left = amount - 100
                setTimeout(async ()=>{
                    message.channel.bulkDelete(left, true)
                    clearEmbed= new MessageEmbed()
                    .setTitle(`Successfully cleared ${amount} messages `)
                    .setColor('GREEN')
                    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                  return await interaction.followUp({embeds: [clearEmbed]}).then((msg)=>setTimeout(() => 
                    msg.delete(), 5000)) 
                }, 2000)
            }
            else if(amount <=300){
                clearchannel.bulkDelete(100, true)
                setTimeout(()=>{
                    clearchannel.bulkDelete(100, true)
                },1500)
                let left = amount - 200
                setTimeout(async ()=>{
                    clearchannel.bulkDelete(left, true)
                    clearEmbed= new MessageEmbed()
                    .setTitle(`Successfully cleared ${amount} messages `)
                    .setColor('GREEN')
                    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                  return await interaction.followUp({embeds: [clearEmbed]}).then((msg)=>setTimeout(() => 
                    msg.delete(), 5000)) 
                }, 1500)
        }
        else{
          errEmbed= new MessageEmbed()
          .setTitle('⚠️Can only delete upto 300 messages')
          .setColor('RED')
          .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
          interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
          msg.delete(), 5000)) 
        }
            }
    
        }
    