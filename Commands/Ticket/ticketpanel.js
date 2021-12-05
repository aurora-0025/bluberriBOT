const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const config = require("../../Data/config.json")


const db = require("quick.db")

module.exports = {
  name: "ticketpanel",
  description: "To create a ticket panel\n ```usage: ;ticketpanel\n[aliases:tpanel]``` ",
  aliases: ['tpanel'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete()
    if(!message.member.permissions.has("ADMINISTRATOR")){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️You dont have permission to do that')
        .setColor('config.accentColor')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
        return message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
        msg.delete(), 5000))  
      }
      let ticketCategoryID = db.get(`${message.guild.id}_ticketCategory`);
      console.log(ticketCategoryID);
      if (!ticketCategoryID){
        errEmbed= new MessageEmbed()
        .setTitle('⚠️Please set a ticket channel category')
        .setColor('RED')
        .setFooter(`© ${message.guild.name} |this message will be deleted in 5 seconds`);
      return  message.channel.send({embeds: [errEmbed]}).then((msg)=>setTimeout(() => 
      msg.delete(), 5000)) 
      }
const embed = new MessageEmbed()
.setColor('config.accentColor')
.setAuthor(message.guild.name, message.guild.iconURL({
    dynamic: true
}))
.setDescription(
    "__**How to create a ticket**__\n" +


    "> Click on the button below\n" +

    "> Once the ticket is made you will be able to type in there"

)
.setTitle('Create A Ticket')
.setThumbnail('https://i.ibb.co/TP1Bt00/hd-tickets-49041.png')


const bt = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId('tic')
    .setLabel('🎫 Create Ticket!')
    .setStyle('SECONDARY'),
);

message.channel.send({
embeds: [embed],
components: [bt]
});
}
}