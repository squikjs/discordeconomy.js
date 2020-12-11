//import the package
const DiscordEconomy = require('./index.js');

//discord.js setup
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const prefix = '!'; // your bot prefix
const token = 'token'; // your bot token

//for balance commands
let balance = new DiscordEconomy.Balance();

//for custom items
let gem = new DiscordEconomy.Item('gem');


//discord.js READY event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

//discord.js MESSAGE event
client.on('message', message => {
    if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'work'){ //sample WORK command
        balance.add(message.author.id, 100); //add(id, amount) adds the "amount" coins to id
        message.reply('you got 100 coins!');
    }

    else if (command === 'balance'){ //sample BALANCE command
        message.reply(`you have ${balance.fetch(message.author.id)} coins.`); //fetch(id) gives you the balance
    }

    else if (command === 'mine'){ //sample MINE command
        gem.add(message.author.id, 2); //adds to custom gem item
        message.reply(`you got 2 gems!`);
    }

    else if (command === 'inventory'){ //sample INVENTORY command
        message.reply(`you have ${gem.fetch(message.author.id)} gem.`); //fetch(id) gives you the amount of gems
    }

    else if (command === 'leaderboard'){ //sample LEADERBOARD command
        if (!args[0]) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} balance/gem\``);
        if(args[0].toLowerCase() !== 'balance' && args[0].toLowerCase() !== 'gem') return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} balance/gem\``);
            
        if(args[0].toLowerCase() === 'balance'){ 
            const lbEmbedBalance = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Leaderboard [Balance]')
                    .setDescription(balance.leaderboard(15));
            return message.channel.send(lbEmbedBalance); 
        }
        else if(args[0].toLowerCase() === 'gem'){ 
            const lbEmbedGem = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Leaderboard [Gem]')
                    .setDescription(gem.leaderboard(15));
            return message.channel.send(lbEmbedGem);
        }    
    }

    else if (command === 'transfer' || command === 'give'){ //sample TRANSFER/GIVE command
        if (!args[0] || !args[1] || !args[2]) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coins/gem] [amount] [user]\``);
        if(args[0].toLowerCase() !== 'coins' && args[0].toLowerCase() !== 'gem') return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coins/gem] [amount] [user]\``);

        let amount = args[1];
        if(isNaN(amount) || amount <= 0) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coins/gem] [amount] [user]\``);

        if(args[0].toLowerCase() === 'coins'){
            if(balance.fetch(message.author.id) < amount) return message.reply('you don\'t have enough coins!');

            let user = args[2];
            if(!user.startsWith('<@!') && !user.endsWith('>')) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coins/gem] [amount] [user]\``);

            user = user.slice(3, -1);
            balance.transfer({ from: message.author.id, to: user, amount: amount}); //transfer to user
        }

        if(args[0].toLowerCase() === 'gem'){
            if(gem.fetch(message.author.id) < amount) return message.reply('you don\'t have enough gem!');

            let user = args[2];
            if(!user.startsWith('<@!') && !user.endsWith('>')) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [coins/gem] [amount] [user]\``);

            user = user.slice(3, -1);
            gem.transfer({ from: message.author.id, to: user, amount: amount}); //transfer to user
        }
    }

    else if (command === 'coinflip' || command === 'cf'){ //sample COINFLIP command
        if (!args[0]) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [amount] [head/tail]\``);
        if(args[1].toLowerCase() !== 'head' && args[1].toLowerCase() !== 'tail') return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [amount] [head/tail]\``);

        let amount = args[0];
        if(isNaN(amount) || amount <= 0) return message.reply(`wrong syntax!\nCorrect Syntax is - \`${prefix}${command} [amount] [head/tail]\``);

        let cf = balance.coinflip(message.author.id, amount, args[1].toLowerCase()); // THIS ADDS OR SUBRACTs THE COINS SO DON'T BOTHER!
        message.channel.send(`🎰 COINFLIP 🎰\nIt was \`${cf.coin}\`!\n**${message.author.username}**, you ${cf.result}!`);
    }

    else if (command === 'slots'){ //sample SLOTS command
        if(!args[0] || isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0) return message.reply('wrong syntax\nCorrect syntax - ' + `\`${prefix}${command} [amount]\``);

        const slots = balance.slots(message.author.id, parseInt(args[0]), ["🍎", "🍌", "🍿", "🍨", "🍇"]); //in the 3rd paramter, you can put array of objects
        message.reply(`${slots.board}\nYou ${slots.result}`)
    }

});

client.login(token);
