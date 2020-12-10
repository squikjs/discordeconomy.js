const db = require('quick.db');
const chalk = require('chalk');

class Balance {
    constructor() {}

    add = (id, amountInitial) => {
        if (!id || !amountInitial) throw new Error(`ID and AMOUNT have to be given!`);

        let amount = parseInt(amountInitial);
        if (isNaN(amount)) throw new Error('AMOUNT should only be a number!');
        if (amount <= 0) console.log(`discordeconomy.js - ` + chalk.black.bgYellow`WARN` + ` ADD AMOUNT is put as less than or equal to 0!`);

        db.add(`${id}.balance`, amount);
    };

    subtract = () => {
        if (!id || !amountInitial) throw new Error(`ID and AMOUNT have to be given!`);

        let amount = parseInt(amountInitial);
        if (isNaN(amount)) throw new Error('AMOUNT should only be a number!');
        if (amount >= 0) console.log(`discordeconomy.js - ` + chalk.black.bgYellow`WARN` + ` SUBRACT AMOUNT is put as more than or equal to 0!`);

        db.add(`${id}.balance`, amount);
    };
}