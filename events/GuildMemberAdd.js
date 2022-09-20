const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const client = require("../index");
const db = require("quick.db");
const config = require("../Data/config.json");

client.on("guildMemberAdd", async (member) => {
    const user = await member.user.fetch({ force: true });
    const welcomeChannel = client.channels.cache.get(
        db.get(`${member.guild.id}_welcomeChannel`)
    );
    let status = "🔴 NOT VERIFIED";
    if (member.user.bot) return;
    dmEmbed = new MessageEmbed()
        .setDescription(
            `
Hi please state your full name to gain full access to CSE server.

**Note: If you do not state your real name you might not get access to the server**
    `
        )
        .setColor(config.accentColor)
        .setFooter("© bluberri | you have 3 min to enter your name");

    failEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
            `
You failed to verify in time so you have been kicked
**please use the invite link again to retry the verification**`
        )
        .setFooter("© bluberri");

    kickEmbed = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(member.displayAvatarURL())
        .setDescription(
            `
${member} was kicked!
***__REASON__***
Failed to verify
`
        );

    verifyEmbed = new MessageEmbed()
        .setDescription(
            `
**You Have Been Verified ✔**

📖 Read the <#916632480012976139> to check the community rules
and other useful information.

🤴 Make sure you claim your roles based from <#916755385036189707>

`+"```"+"Also select your batch below"+"```"
        )
        .setColor("GREEN")
        .setFooter("© bluberri");

    embedAccent = `BLURPLE`;
    if (user.accentColor != null) {
        embedAccent = `${user.hexAccentColor}`;
    }

    welcomeEmbed = new MessageEmbed()
        .setTimestamp()
        .setThumbnail(member.displayAvatarURL())
        .setDescription(
            `
Hello  ${member} Welcome to CS! <a:pika:935866504447131659>

🏮 Read the <#916632480012976139> to check the community rules
and other useful information.

🏮 Make sure you claim your roles based in <#916755385036189707>

**__STATUS__** 
${status}
`
        )
        .setColor(embedAccent)
        .setFooter("© bluberri");

    const roleRow = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setMaxValues(1)
            .setCustomId("classselect")
            .setPlaceholder("Select Your Batch")
            .addOptions([
                {
                    label: "CS1",
                    value: "cs1",
                },
                {
                    label: "CS2",
                    value: "cs2",
                },
            ])
    );

    const dm = await member.send({ embeds: [dmEmbed] });
    let welcomeMessage;
    if (welcomeChannel) {
        welcomeMessage = await welcomeChannel.send({ embeds: [welcomeEmbed] });
    }

    const filter = (message) => {
        if (message.author.id == client.user.id) return;
        if (message.author.id != member.id) return;
        if (message.content) {
            return message.content;
        }
    };

    try {
        const response = await dm.channel.awaitMessages({
            filter,
            max: 1,
            time: 180000,
            errors: ["time"],
        });
        if (response) {
            res = response.first();
            status = "🟢 VERIFIED";
            await member.roles.add("916364353681387570");
            member.send({ embeds: [verifyEmbed], components: [roleRow] });
            let nickname = response.values().next().value.content;
            await member.setNickname(nickname);

            if (welcomeChannel) {
                try {
                    welcomeEmbed.setColor("GREEN");
                    welcomeEmbed.setDescription(
                        `
Hello  ${member} Welcome to CS! <a:pika:935866504447131659>
            
🏮 Read the <#916632480012976139> to check the community rules
and other useful information.
            
🏮 Make sure you claim your roles based in <#916755385036189707>

**__STATUS__** 
${status}
            `
                    );
                    welcomeMessage.edit({
                        embeds: [welcomeEmbed],
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (err) {
        await member.send({ embeds: [failEmbed] });
        member.kick("not verified");
        if (welcomeChannel) {
            welcomeChannel.send({ embeds: [kickEmbed] });
        }
    }
});
