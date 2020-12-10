const db = require('quick.db');
const chalk = require('chalk');

//error Handling
const warn = require('./errors/Warn');
const error = require('./errors/Error');

class Balance {
    constructor() {}

    add = async (id, amountInitial) => {
        if (!id || !amountInitial) throw new Error(`ID and AMOUNT have to be given!`);

        let amount = parseInt(amountInitial);
        if (isNaN(amount)) throw new Error('AMOUNT should only be a number!');
        if (amount <= 0) warn('ADD AMOUNT is put as less than or equal to 0!');

        await db.add(`${id}.balance`, amount);
    };

    subtract = async (id, amountInitial) => {
        if (!id || !amountInitial) throw new Error(`ID and AMOUNT have to be given!`);

        let amount = parseInt(amountInitial);
        if (isNaN(amount)) throw new Error('AMOUNT should only be a number!');
        if (amount >= 0) warn('SUBRACT AMOUNT is put as more than or equal to 0!');

        await db.add(`${id}.balance`, -amount);
    };

    fetch = (id) => {
        if (!id) throw new Error('ID has to be specified!');

        let balance = db.get(`${id}.balance`);
        if (balance === undefined || balance === null) warn(`Fetched balance is ${balance}!`);

        return balance;
    };

    leaderboard = (client, Limit) => {
        if (!client) throw new SyntaxError(`${chalk.yellow`<client>`} (which is the ${chalk.blue`Discord.Client()`}) should be given!`);

        let limit;
        if (!Limit) limit = 10;

        const lb = db.all()
            .filter(user => client.users.cache.has(user.ID))
            .sort((a, b) => b.data.balance - a.data.balance)
            .map((user, position) => `#${position + 1} **${client.users.cache.get(user.ID).tag}**: ${user.data.balance} coins`)
        return lb.slice(0, limit);    

    };
};

module.exports = Balance;