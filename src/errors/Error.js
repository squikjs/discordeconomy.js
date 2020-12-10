const chalk = require('chalk');

module.exports = function(error){
    console.log(`discordeconomy.js - ` + chalk.italic.black.bgRed` ERR ` + ` ${error}`);
};