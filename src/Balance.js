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

    leaderboard = (Limit) => {
        let limit;
        if (!Limit) limit = 10;

        const lb = db.all()
            .sort((a, b) => b.data.balance - a.data.balance)
            .map((user, position) => `#${position + 1} <@!${user.ID}>: ${user.data.balance} coins`)
        return lb.slice(0, limit);    

    };

    has = (id, Min) => {
        if (!id) throw new Error('ID has to be specified!');
        if (!Min) throw new Error('Minium value has to be specified, followed by the ID!');

        let min = parseInt(Min);
        if(isNaN(min) || min <= 0) throw new Error('Minium value van only be a integer greater than 0!');

        if(db.get(`${id}.balance`) >= min) return true;
        else return false;
    };
};

module.exports = Balance;