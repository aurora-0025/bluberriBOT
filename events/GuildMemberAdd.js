const { MessageEmbed } = require("discord.js");
const client = require("../index");
const config = require("../Data/config.json");


client.on('guildMemberAdd', async (member)=> {
    dmEmbed = new MessageEmbed()
    .setDescription(`Hi please state your full name to gain full access to CSE server.
    **Note: If you do not state your real name you might not get access to the server**
    `)
    .setColor(config.accentColor)
    .setFooter("© bluberri | you have 1 min to enter your name");

    failEmbed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`You failed to verify in time so you have been kicked
    **please use the invite link again to retry the verification**`)
    .setFooter("© bluberri");


    verifyEmbed = new MessageEmbed()
    .setDescription(`
    **You Have Been Verified ✔**`)
    .setColor('GREEN')
    .setFooter("© bluberri");

    const dm = await member.send({ embeds: [dmEmbed] })

    const filter = (message) => {
        if(message.author.id !== member.id) return;
        if(message.content){
            return message.content;
        };
    }

    try{
        const response= await dm.channel.awaitMessages({ filter, max:1,time:60000 ,errors: ['time']}); 
        if(response) {
            member.roles.add('916364353681387570')
            member.send({ embeds: [verifyEmbed] })
            let nickname=response.values().next().value.content    
            member.setNickname(nickname)
        }    
    } catch (err) {
        console.log(err);
        await member.send({ embeds: [failEmbed] })
        member.kick('not verified')
    }
    


})