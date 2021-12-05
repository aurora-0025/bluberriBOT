const client = require("../index");

;
client.on("ready", async () =>{
  let guild = await client.guilds.fetch('916357864874979388')
  console.log(`${client.user.tag} is up and ready to go!`)
  setInterval( function () { 
     client.user.setPresence({
      game: { name: `${guild.memberCount} Members ` },
      type: "WATCHING",
      status: 'invisible',
     });
    //  client.user.setActivity(`${guild.memberCount} Members `, { type: "WATCHING" }) 
  }, 10000);
}
);

