const testI = require('./index.js');
const test = new testI.Balance();
// test.add('3', 1000)
// const lb = test.all()
// .sort((a, b) => b.data.balance - a.data.balance)
// .map((user, position) => `#${position + 1} ${user.ID}: ${user.data.balance} simple items`)

console.log(test.has('10', 1));
