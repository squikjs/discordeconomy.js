# DiscordEconomy.js 
![DEconomy.js](https://cdn.discordapp.com/attachments/786838080656113667/786841865630253118/de.js__2_-removebg-preview.png)
***
### Want to make a economy bot with Discord?
#### We have your back! This package will allow you to make your first economy discord bot!
# Installation
Just run this command in your console!

⚠️ Warning ⚠️- This package uses `quick.db`.
```
npm install discordeconomy.js
```
# Working
## Importing the package
```js
//import
const DiscordEconomy = require('discordeconomy.js');

//for balance commands
let balance = new DiscordEconomy.Balance();

//for custom items
let gem = new DiscordEconomy.Item('gem');
```
## Sample Bot Code [here](https://github.com/Wildwolf210/discordeconomy.js/blob/main/sample.js)
## Functions
### Balance
---
- **`add(ID, AMOUNT)`** - "ID" is the id of the user to add to, and "AMOUNT"(number) is the amount to add.
- **`subtract(ID, AMOUNT)`** - "ID" is the id of the user to sutract from, and "AMOUNT"(number) is the amount to subtract.
- **`fetch(ID)`** _`[RETURN :- string]`_ - "ID" is the id you want to fetch the balance from.
- **`leaderboard(LIMIT)`** _`[RETURN :- array]`_ - "LIMIT" is optional, that gives the limit of users to give.
- **`has(ID, MINIMUM_amount)`** _`[RETURN :- boolean]`_ - "ID" is the user to check the balance, "MINIMUM_AMOUNT" is the minimum amount to check for.
- **`slots(ID, AMOUNT, ITEMS)`** _`[RETURN :- object]`_ - "ID" is the user to add or subtract the coins from, "AMOUNT" is the amount to bet and "ITEMS"(array) is the array of items that are in the slots. _RETURN_ is something like this: `{result: win/lose, amount: amount_won_or_lost, board: board_of_slots_items, win_multiplier: multiplier_of_amount}`

