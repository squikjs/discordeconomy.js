const chalk = require('chalk');

module.exports = function(warning){
    console.log(`discordeconomy.js - ` + chalk.italic.black.bgYellow` WARN ` + ` ${warning}`);
};