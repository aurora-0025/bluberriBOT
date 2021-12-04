  const { MessageEmbed, MessageAttachment, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = require("../index");
const config = require("../Data/config.json");
const Canvas = require('canvas')

var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage('./img/blueberry.jpg').then(async (img)=> {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
    welcomeCanvas.context.fillText("Welcome", 360, 360);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke();
    welcomeCanvas.context.fill()
})

client.on('guildMemberAdd', async (member)=> {
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
            let canvas = welcomeCanvas;
            canvas.context.font = '42px sans-serif',
            canvas.context.textAlign = 'center';
            canvas.context.fillText(member.user.username.toUpperCase(), 512, 410)
            canvas.context.font = '32px sans-serif'
            canvas.context.fillText(`You are the ${member.guild.memberCount}th member`, 512, 455)
            canvas.context.beginPath();
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
            canvas.context.closePath()
            canvas.context.clip()
            await Canvas.loadImage(member.user.displayAvatarURL({format:'png', size:1024}))
            .then(img => {
                canvas.context.drawImage(img, 393, 47, 238, 238);
            })
            let attachment = new MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
            try{
                welcomeChannel.send({content:`hello ${member}, welcome ${member.guild.name}!`, files: [attachment]})
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