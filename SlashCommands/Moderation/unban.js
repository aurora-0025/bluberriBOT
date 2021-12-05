const { Client, CommandInteraction, MessageEmbed, User } = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "unban",
    description: "To unban banned members",
    type: 'CHAT_INPUT',
    options:[
        { 
        name: "userid",
        description:"userid of banned member",
        required: true,
        type:"STRING",
    }
],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)
const userID=args

            if(!interactionMember.permissions.has("BAN_MEMBERS")){
                errEmbed= new MessageEmbed()
                .setTitle('⚠️You dont have permission to do that')
                .setColor('RED')
                .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000)) 
              };
              interaction.guild.bans.fetch().then(bans=> {
                if(bans.size == 0) return ;
                let bUser = bans.find(b => b.user.id == userID)
                if(!bUser) {
                    invalidMentionEmbed= new MessageEmbed()
                    .setTitle(`⚠️Please enter a valid userID to unban someone use \`/banlist\` to view all the banned members`)
                    .setColor('RED')
                    .setFooter(`© ${interaction.guild.name} |this message will be deleted in 10 seconds`);
              
                  return interaction.followUp({embeds: [invalidMentionEmbed]}).then((msg)=>setTimeout(() => 
                  msg.delete(), 10000)) 
                }
                unbanEmbed= new MessageEmbed()
                .setTitle(`**${bUser.user.username}** has been unbanned`)
                .setColor('#FF69B4')
                .setFooter(`© ${interaction.guild.name}`)
                .setTimestamp();
               interaction.followUp({embeds: [unbanEmbed]})
                interaction.guild.members.unban(bUser.user)
        })

            }
        }