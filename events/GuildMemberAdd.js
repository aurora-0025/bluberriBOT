  const { MessageEmbed, MessageAttachment, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = require("../index");
const config = require("../Data/config.json");
client.on('guildMemberAdd', async (member)=> {
    const user = await member.user.fetch({force:true})
    if(member.user.bot) return;
    member.roles.add('916364353681387570')
    dmEmbed = new MessageEmbed()
    .setDescription(`Hi please state your full name to gain full access to CSE server.
    **Note: If you do not state your real name you might not get access to the server**
    `)
    .setColor(config.accentColor)
    .setFooter("© bluberri | you have 3 min to enter your name");

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

    embedAccent=`BLURPLE`
    if(user.accentColor != null){
        embedAccent=`${user.hexAccentColor}`
    }
    

    welcomeEmbed = new MessageEmbed()
    .setTitle('WELCOME!')
    .setTimestamp()
    .setThumbnail(member.displayAvatarURL())
    .setDescription(`
    ${member} **has joined the server**`)
    .setColor(embedAccent)
    .setFooter("© bluberri");

    const roleRow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setMaxValues(1)
            .setCustomId('classselect')
            .setPlaceholder('Select Your Batch')
            .addOptions([
                {
                    label: 'CS1',
                    value: 'cs1',
                },
                {
                    label: 'CS2',
                    value: 'cs2',
                },
            ]),
    );

    const dm = await member.send({ embeds: [dmEmbed], components: [roleRow] })

    const filter = (message) => {
        if(message.author.id !== member.id) return;
        if(message.content){
            return message.content;
        };
    }

    try{
        const response= await dm.channel.awaitMessages({ filter, max:1,time:180000 ,errors: ['time']}); 
        if(response) {
            member.roles.add('916364353681387570')
            member.send({ embeds: [verifyEmbed] })
            let nickname=response.values().next().value.content    
            member.setNickname(nickname)
            const welcomeChannel = client.channels.cache.get('916655394229747783')
            try{

            welcomeChannel.send({content:`hello ${member}, welcome ${member.guild.name}!\n check out <#916755385036189707> and claim the roles`, embeds:[welcomeEmbed]})
            }catch (error) {
                console.log(error);
            }
        }    
    } catch (err) {
        console.log(err);
        await member.send({ embeds: [failEmbed] })
        member.kick('not verified')
    }
    


})