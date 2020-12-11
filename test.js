const testI = require('./index.js');
const test = new testI.Balance();
const chalk = require('chalk');
// test.add('3', 1000)
// const lb = test.all()
// .sort((a, b) => b.data.balance - a.data.balance)
// .map((user, position) => `#${position + 1} ${user.ID}: ${user.data.balance} simple items`)

// test.transfer({from: 'ji', to: 'lala', amount: 1})
console.log(test.leaderboard())
