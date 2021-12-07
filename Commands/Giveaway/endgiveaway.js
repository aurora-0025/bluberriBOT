const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
const config = require("../../Data/config.json")

module.exports = {
  name: "endgiveaway",
  description: "To end a giveaway",
  usage: `${config.prefix}endgiveaway <giveaway message ID>`,
  example:`${config.prefix}endgiveaway 77565561243681`,
  aliases: ['gend'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    message.delete()
    const giveawayID = args[0];
    if(!message.member.permissions.has("ADMINISTRATOR")){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️You dont have permission to do that')
        .setColor('RED')
        .setFooter('©bluberri');
        message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
      }
      if(!giveawayID){
        incorrectFormatEmbed= new MessageEmbed()
        .setTitle("⚠️Please Use The Correct Format"+"```"+';endgiveaway <giveaway message ID>'+'```')
        .setColor('RED')
        .setFooter('©bluberri');
      return  message.channel.send({embeds:[incorrectFormatEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 10000)) 
    }
    else{
        try{
      let giveawayChannelID = db.get(`${message.guild.id}_giveawayChannel`)
      const giveawayChannel = message.member.guild.channels.cache.find(c => c.id== giveawayChannelID)
      const giveawayEmbed = await giveawayChannel.messages.fetch(giveawayID);
      const data = giveawayEmbed.embeds[0];

      let reactions = await giveawayEmbed.reactions.cache.get("🎉").users.fetch()
      reactions = await reactions.values()
      var reactUsers = []
      for (const value of reactions) {
         if (!value.bot){
      reactUsers.push(value)
         }
      }
    let prize = db.get(`${giveawayID}_giveaway.prize`)
    let winners= db.get(`${giveawayID}_giveaway.winners`)
    let status= db.get(`${giveawayID}_giveaway.status`)
    if(status!="ONGOING"){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️You cant end an already ended giveaway')
        .setColor('RED')
        .setFooter('©bluberri');
        return message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
    }
    if(reactUsers.length<winners){
        const endembed = new MessageEmbed()
        .setTitle("**GIVEAWAY HAS ENDED**")
        .setDescription(`🏆Prize: ${prize}\n 🕒Duration: ${ms(time, { long: true })}\n 👤Hosted By: ${message.author.username}`)
    .setThumbnail('https://i.ibb.co/P98kzhD/Pngtree-giveaway-transparent-background-6408262-1.png')
        .addField('STATUS','ENDED')
        .addField('REASON',`Not enough participants`)
        .setColor("RED")
        .setFooter("Ended At")
        .setTimestamp()
        return  giveawayEmbed.edit({embeds:[endembed]})
      }
      let w = []

      for (let i = 1; i <= winners; i++) {
        w.push(reactUsers[Math.floor(Math.random() * reactUsers.length)])
      }

      const endembed = new MessageEmbed()
      .setTitle("✨**GIVEAWAY HAS ENDED**✨")
      .setDescription(data.description)
      .setThumbnail('https://i.ibb.co/P98kzhD/Pngtree-giveaway-transparent-background-6408262-1.png')
      .addField('STATUS','ENDED')
      .addField('WINNERS',`🎉 ${prize} was won by the following participant(s):\n${w.join(",")}`)
      .setColor(config.accentColor)
      .setFooter("Ended At")
      .setTimestamp()
        giveawayEmbed.edit({embeds:[endembed]})
      db.set(`${giveawayID}_giveaway.status`,"ENDED")
    }
    catch(error){
        console.log(error);
        invalidMessageEmbed= new MessageEmbed()
        .setTitle("⚠️That Giveaway Does Not Exist")
        .setColor('RED')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
       return message.channel.send({embed:[invalidMessageEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000)) 
    }

    }
}
}
