//import the package
const DiscordEconomy = require("./index");

// discord.js setup
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const prefix = "!"; // your bot prefix
const token = "ODIyMDEzNTgyNTU1MjE3OTIw.YFMFzg.cIgGdk8na1TWunWW79nb8OwPLRU"; // your bot token

// for balance commands
let balance = new DiscordEconomy.Balance();

// for custom items
let gem = new DiscordEconomy.Item("gem");

// discord.js READY event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//discord.js MESSAGE event
client.on("message", (message) => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
    return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  switch (command) {
    case "work": // sample work command
      balance.add(message.author.id, 100); // adding to database
      message.reply("you got 100 coins.");
      break;

    case "mine": // sample mine command
      gem.add(message.author.id, 3); // adding to database
      message.reply("you got 3 gems.");
      break;

    case "balance": // sample balance command
    case "bal": //  alias "bal"
    case "b": //  alias "b"
      message.reply("you have " + balance.fetch(message.author.id)); // fetching from database
      break;

    case "inventory": // sample inventory command
    case "inv": //  alias "inv"
    case "i": //  alias "i"
      message.reply("you have " + gem.fetch(message.author.id) + " gems."); // fetching from database
      break;

    case "leaderboard": // sample leaderboard command
    case "lb": //  alias "lb"
      /* 
        NOTE - You can use a function as a argument, and it will automatically map it
               OR you can use the map function on your own and make the leaderboard as per your choice
        */
      if (!args[0] || (args[0] !== "balance" && args[0] !== "gem"))
        return message.reply(
          "incorrect syntax. Correct Syntax is `" +
            prefix +
            command +
            " [balance|gem]`"
        );

      if (args[0].toLowerCase() === "balance") {
        const leaderboard = balance
          .leaderboard(
            (id, amount, position) =>
              `No. **${position}**: <@!${id}> (${amount} coins)`
          )
          .join("\n");
        const embed = new MessageEmbed()
          .setDescription(leaderboard)
          .setTitle("Leaderboard (Balance)");

        message.channel.send(embed);
      } else if (args[0].toLowerCase() === "gem") {
        const leaderboard = gem
          .leaderboard(
            (id, amount, position) =>
              `No. **${position}**: <@!${id}> (${amount} gems)`
          )
          .join("\n");
        const embed = new MessageEmbed()
          .setDescription(leaderboard)
          .setTitle("Leaderboard (Gems)");

        message.channel.send(embed);
      }

      break;
    case "slots": // sample slots command
      {
        if (!args[0] || (args[0] !== "coin" && args[0] !== "gem"))
          return message.reply(
            "incorrect syntax. Correct Syntax is `" +
              prefix +
              command +
              " [coin|gem] [amount]`"
          );
        if (Number.isNaN(Number(args[1]))) {
          return message.reply("amount can only be a number.");
        }

        let amount = Number(args[1]);

        if (args[0].toLowerCase() === "coin") {
          if (amount > balance.fetch(message.author.id)) {
            return message.reply("you don't have enough coins!");
          }
          const slots = balance.slots(
            message.author.id, // ⇦ Id
            amount, // ⇦ Amount to bet
            [
              "🍎",
              "🍌",
              "🍿", // ⇦ Items array
              "🍨",
              "🍇",
            ],
            3 // ⇦ Number of items to take into consideration, put "undefined" for default 3
          );
          message.channel.send(
            slots.board.join("  ") +
              "\n" +
              `**${message.author.username}** ${slots.win ? "won" : "lost"}`
          );
        } else if (args[0].toLowerCase() === "gem") {
          if (amount > gem.fetch(message.author.id)) {
            return message.reply("you don't have enough gems!");
          }
          const slots = gem.slots(
            message.author.id, // ⇦ Id
            amount, // ⇦ Amount to bet
            [
              "✨",
              "🎃",
              "🎆", // ⇦ Items array
              "💎",
              "🎀",
            ],
            3 // ⇦ Number of items to take into consideration, put "undefined" for default 3
          );
          message.channel.send(
            slots.board.join("  ") +
              "\n" +
              `**${message.author.username}** ${slots.win ? "won" : "lost"}`
          );
        }
      }
      break;

    case "coinflip": // sample slots command
    case "cf": //  alias "cf"
      {
        if (
          !args[0] ||
          (args[0] !== "coin" && args[0] !== "gem") ||
          !args[1] ||
          !args[2]
        )
          return message.reply(
            "incorrect syntax. Correct Syntax is `" +
              prefix +
              command +
              " [coin|gem] [amount] [choice]`"
          );
        if (Number.isNaN(Number(args[1]))) {
          return message.reply("amount can only be a number.");
        }
        let choice = args[2];
        let amount = Number(args[1]);

        if (!["h", "head", "heads", "t", "tail", "tails"].includes(choice)) {
          return message.reply(
            "choice can only be one of the following:\n" +
              ["h", "head", "heads", "t", "tail", "tails"]
                .map((c) => "`" + c + "`")
                .join(" or ")
          );
        }

        if (args[0].toLowerCase() === "coin") {
          if (amount > balance.fetch(message.author.id)) {
            return message.reply("you don't have enough coins!");
          }

          const cf = balance.coinflip(message.author.id, amount, choice);
          message.channel.send(
            "Your Choice: " +
              choice +
              "\nWanted coin: " +
              cf.coin +
              `\n**${message.author.username}** ${cf.win ? "won" : "lost"}`
          );
        } else if (args[0].toLowerCase() === "gem") {
          if (amount > gem.fetch(message.author.id)) {
            return message.reply("you don't have enough gems!");
          }

          const cf = gem.coinflip(message.author.id, amount, choice);
          message.channel.send(
            "Your Choice: " +
              choice +
              "\nWanted coin: " +
              cf.coin +
              `\n**${message.author.username}** ${cf.win ? "won" : "lost"}`
          );
        }
      }
      break;

    case "transfer": // sample transfer command
    case "give": // alias "give"
      {
        if (
          !args[0] ||
          !args[1] ||
          !args[2] ||
          (args[0].toLowerCase() !== "coin" && args[0].toLowerCase() !== "gem")
        )
          return message.reply(
            `wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coin/gem] [amount] [user]\``
          );

        let amount = Number(args[1]);
        let user = args[2];
        if (
          Number.isNaN(amount) ||
          amount <= 0 ||
          !user.startsWith("<@!") ||
          !user.endsWith(">")
        )
          return message.reply(
            `wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coin/gem] [amount] [user]\``
          );
        user = user.slice(3, -1);

        if (args[0].toLowerCase() === "coin") {
          if (balance.fetch(message.author.id) < amount)
            return message.reply("you don't have enough coins!");

          balance.transfer({
            from: message.author.id,
            to: user,
            amount: amount,
          });
          message.reply(`transfered \`${amount}\` coins to <@!${user}>`);
        } else if (args[0].toLowerCase() === "gem") {
          if (gem.fetch(message.author.id) < amount)
            return message.reply("you don't have enough gems!");

          gem.transfer({
            from: message.author.id,
            to: user,
            amount: amount,
          });
          message.reply(`transfered \`${amount}\` gems to <@!${user}>`);
        }
      }
      break;
    default:
      message.reply("no command called `" + command + "` found.");
      break;
  }
});

client.login(token);
