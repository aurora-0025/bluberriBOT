const { MessageEmbed } = require("discord.js");

const config = require("../../Data/config.json");

module.exports = {
  name: "tictactoe",
  description: "To play tic tac toe with someone",
  usage: `${config.prefix}tictactoe <mention>`,
  example: `${config.prefix}tictactoe @user`,
  aliases: ["ttt"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();

    var player;
    const target = message.mentions.users.first();
    if (target) {
      var char1 = message.guild.members.cache.get(target.id);
      var char2 = message.author;
      rand = Math.floor(Math.random() * 2);
      if (rand == 0) {
        player = char1;
      }
      if (rand == 1) {
        player = char2;
      }
      message.channel.send(`${player} goes first`);
    }
    var m1 = 0;
    var m2 = 0;
    var m3 = 0;
    var m4 = 0;
    var m5 = 0;
    var m6 = 0;
    var m7 = 0;
    var m8 = 0;
    var m9 = 0;
    var game = "x";
    var gameState;
    function state() {
      //horizontal check
      if (
        board[0] + board[1] + board[2] == "❌" + "❌" + "❌" ||
        board[0] + board[1] + board[2] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      if (
        board[3] + board[4] + board[5] == "❌" + "❌" + "❌" ||
        board[3] + board[4] + board[5] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      if (
        board[6] + board[7] + board[8] == "❌" + "❌" + "❌" ||
        board[6] + board[7] + board[8] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      //vertical check
      if (
        board[0] + board[3] + board[6] == "❌" + "❌" + "❌" ||
        board[0] + board[1] + board[2] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      if (
        board[1] + board[4] + board[7] == "❌" + "❌" + "❌" ||
        board[3] + board[4] + board[5] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      if (
        board[2] + board[5] + board[8] == "❌" + "❌" + "❌" ||
        board[6] + board[7] + board[8] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      //diagonal check
      if (
        board[0] + board[4] + board[8] == "❌" + "❌" + "❌" ||
        board[0] + board[1] + board[2] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      if (
        board[2] + board[4] + board[6] == "❌" + "❌" + "❌" ||
        board[2] + board[4] + board[6] == "⭕" + "⭕" + "⭕"
      ) {
        gameState = "win";
        return message.channel
          .send(`${player} won the game🎉🎊`)
          .then(() => msg.delete());
      }
      //draw check
      if (
        board[0] != "🟦" &&
        board[1] != "🟦" &&
        board[2] != "🟦" &&
        board[3] != "🟦" &&
        board[4] != "🟦" &&
        board[5] != "🟦" &&
        board[6] != "🟦" &&
        board[7] != "🟦" &&
        board[8] != "🟦"
      ) {
        gameState = "draw";
        return message.channel
          .send(`The game is a draw`)
          .then(() => msg.delete());
      }
    }

    var board = ["🟦", "🟦", "🟦", "🟦", "🟦", "🟦", "🟦", "🟦", "🟦"];
    var drawboard =
      board[0] +
      board[1] +
      board[2] +
      "\n" +
      board[3] +
      board[4] +
      board[5] +
      "\n" +
      board[6] +
      board[7] +
      board[8] +
      "\n";

    if (!target)
      return message.channel.send(
        "```" +
          "diff" +
          "\n" +
          "-" +
          "Please mention someone! correct usage:!ttt @<someone>" +
          "```"
      );
    const msg = await message.channel.send(drawboard);
    console.log(msg.id);
    msg
      .react("↖️")
      .then(() => msg.react("⬆️"))
      .then(() => msg.react("↗️"))
      .then(() => msg.react("⬅️"))
      .then(() => msg.react("⏺️"))
      .then(() => msg.react("➡️"))
      .then(() => msg.react("↙️"))
      .then(() => msg.react("⬇️"))
      .then(() => msg.react("↘️"));
    const reaction = message.reactions;
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.id == msg.id) {
        //FIRST HORIZONTAL ROW
        if (reaction.emoji.name == "↖️") {
          if (m1 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[0] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m1 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            message.channel
              .send(`It is now ${player}'s turn`)
              .then((msg) => setTimeout(() => msg.delete(), 600000));
          }
          if (m1 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[0] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m1 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "⬆️") {
          if (m2 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[1] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m2 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m2 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[1] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m2 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "↗️") {
          if (m3 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[2] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m3 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m3 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[2] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m3 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }
        //SECOND HORIZONTAL ROW
        if (reaction.emoji.name == "⬅️") {
          if (m4 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return msg
                .reply("It is not your turn")
                .then((m) => setTimeout(() => m.delete(), 3000));
            board[3] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m4 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m4 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send(`It is not your turn`);
            board[3] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m4 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "⏺️") {
          if (m5 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[4] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m5 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m5 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[4] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m5 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "➡️") {
          if (m6 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[5] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m6 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m6 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[5] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m6 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }
        //THIRD HORIZONTAL ROW
        if (reaction.emoji.name == "↙️") {
          if (m7 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[6] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m7 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m7 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[6] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m7 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "⬇️") {
          if (m8 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[7] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m8 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m8 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[7] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m8 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }

        if (reaction.emoji.name == "↘️") {
          if (m9 == 0 && game == "x") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[8] = "❌";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m9 = 1;
            game = "o";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
          if (m9 == 0 && game == "o") {
            if (!reaction.users.cache.has(player.id))
              return message.channel.send("It is not your turn");
            board[8] = "⭕";
            drawboard =
              board[0] +
              board[1] +
              board[2] +
              "\n" +
              board[3] +
              board[4] +
              board[5] +
              "\n" +
              board[6] +
              board[7] +
              board[8] +
              "\n";
            msg.edit(drawboard);
            state();
            m9 = 1;
            game = "x";
            if (player == char1) {
              player = char2;
            } else {
              player = char1;
            }
            if (!(gameState == "win" || gameState == "draw")) {
              message.channel.send(`It is now ${player}'s turn`).then((m) => setTimeout(() => m.delete(), 3000));
            }
          }
        }
      }
    });
  },
};
