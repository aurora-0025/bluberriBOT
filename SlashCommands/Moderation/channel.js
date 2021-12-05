const { Client, CommandInteraction, MessageEmbed} = require("discord.js");
const db = require ("quick.db")
module.exports = {
    name: "channel",
    description: "To lock unlock or nuke a channel",
    type: "CHAT_INPUT", 
    options:[
        {
        name:"lock",
        description:"To lock a channel",
        type: 1,
        options:[
            {
                name:"channel",
                description:"Select the channel",
                required: true,
                type:"CHANNEL",
            },
        ],
    },
    {
        name:"unlock",
        description:"To unlock a channel",
        type: 1,
        options:[
            {
                name:"channel",
                description:"Select the channel",
                required: true,
                type:"CHANNEL",
            },
        ],
    },
    {
        name:"nuke",
        description:"To nuke a channel",
        type: 1,
        options:[
            {
                name:"channel",
                description:"Select the channel",
                required: true,
                type:"CHANNEL",
            },
        ],
    },
],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
const {suboptions} = args

const interactionMember =  interaction.guild.members.cache.find(member => member.id == interaction.user.id)

            if(!interactionMember.permissions.has("BAN_MEMBERS")){
                errEmbed= new MessageEmbed()
                .setTitle('⚠️You dont have permission to do that')
                .setColor('RED')
                .setFooter(`© ${interaction.guild.name} |this message will be deleted in 5 seconds`);
                return interaction.followUp({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
                msg.delete(), 5000)) 
              };
            if(suboptions=="lock"){
                const [channel] = args
                const roles = interaction.guild.roles.everyone;
                try{
                    const lockChannel = interaction.guild.channels.cache.get(channel);
                    lockChannel.permissionOverwrites.edit(roles, { SEND_MESSAGES: false });
                    lockEmbed= new MessageEmbed()
                    .setTitle('🔒Locked the channel')
                    .setColor('#FF69B4')
                    .setFooter(`© ${message.guild.name}`)
                    .setTimestamp();
                  return  interaction.followUp({embeds: [lockEmbed]})
                }
                catch(e){
                    console.log(e);
                    lockEmbed= new MessageEmbed()
                    .setTitle('You chose a category instead of channel')
                    .setColor('RED')
                    .setFooter(`© ${message.guild.name}`)
                    .setTimestamp();
                  return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
                  msg.delete(), 5000)) 
                }
            }
            if(suboptions=="unlock"){
                const [channel] = args
                const roles = interaction.guild.roles.everyone;
                const lockChannel = interaction.guild.channels.cache.get(channel);
                try{
                    if(lockChannel.permissionsFor(roles).bitfield===521942713921n){
                    lockChannel.permissionOverwrites.edit(roles, { SEND_MESSAGES: true });
                    unlockEmbed= new MessageEmbed()
                    .setTitle('🔓unlocked the channel')
                    .setColor('#FF69B4')
                    .setFooter(`© ${interaction.guild.name}`)
                    .setTimestamp();
                  return  interaction.followUp({embeds: [unlockEmbed]})}
                  else{
                    noLockEmbed= new MessageEmbed()
                    .setTitle('🔓 This channel is not locked')
                    .setColor('#FF69B4')
                    .setFooter(`© ${interaction.guild.name}`)
                    .setTimestamp();
                    interaction.followUp({embeds: [nolockEmbed]})
                  }
                }
                catch(e){
                    console.log(e);
                    lockEmbed= new MessageEmbed()
                    .setTitle('You chose a category instead of channel')
                    .setColor('RED')
                    .setFooter(`© ${message.guild.name}`)
                    .setTimestamp();
                  return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
                  msg.delete(), 5000)) 
                }
            }
            if(suboptions=="nuke"){
                const [channel] = args
                const nukeChannel = interaction.guild.channels.cache.get(channel);
                if(nukeChannel.type=='GUILD_CATEGORY'){
                lockEmbed= new MessageEmbed()
                .setTitle('⚠️You chose a category instead of channel')
                .setColor('RED')
                .setFooter(`© ${interaction.guild.name} | this message will be deleted in 5 seconds`)
                .setTimestamp();
              return  interaction.followUp({embeds: [lockEmbed]}).then((msg)=>setTimeout(() => 
              msg.delete(), 5000))
            }
                nukeChannel.clone().then((ch)=>{
                    ch.setParent(nukeChannel.parentId);
                    ch.setPosition(nukeChannel.position);
                    message.channel.delete()
                    nukeEmbed= new MessageEmbed()
                    .setTitle(`This channel got NUKED!`)
                    .setImage('https://images2.minutemediacdn.com/image/upload/c_crop,h_1345,w_2000,x_0,y_0/v1555949079/shape/mentalfloss/581049-mesut_zengin-istock-1138195821.jpg')
                    .setColor('#FF69B4')
                    .setFooter(`© ${interaction.guild.id}`)
                    .setTimestamp();
                    ch.send({embeds: [nukeEmbed]})  
                })
            }

            }
        }