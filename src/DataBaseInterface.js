const DB = require("quick.db");

class DataBaseClient {
  constructor(id, item) {
    this.id = id;
    this.item = item;
  }

  async add(...amount) {
    await DB.add(
      `${this.id}.${this.item}`,
      amount.reduce((a, b) => a + b)
    );
  }

  async subtract(...amount) {
    await DB.subtract(
      `${this.id}.${this.item}`,
      amount.reduce((a, b) => a - b)
    );
  }

  fetch() {
    return DB.get(`${this.id}.${this.item}`);
  }

  has(amount) {
    return this.fetch() >= amount;
  }

  transfer(to, amount) {
    if (!DB.get(`${to}.${this.item}`)) {
      return;
    }

    this.subtract(amount);
    DB.add(`${to}.${this.item}`, amount);
  }

  leaderboard(callback) {
    return DB.all()
      .filter((user) => user.data[this.item] !== undefined)
      .sort((a, b) => b.data[this.item] - a.data[this.item])
      .map((user, position) => {
        if (typeof callback === "function") {
          return callback(user.ID, user.data[this.item], position + 1);
        }

        return {
          id: user.ID,
          amount: user.data[this.item],
          position: position + 1,
        };
      });
  }

  slots(amount, items, num) {
    let random = () => items[Math.floor(Math.random() * items.length)];
    let results = new Array();
    for (let i = 1; i <= (num ?? 3); i++) {
      results.push(random());
    }

    if (results.every((result) => result === results[0])) this.add(amount);
    else this.subtract(amount);

    return {
      board: results,
      win: results.every((result) => result === results[0]),
    };
  }

  coinflip(amount, choice) {
    let botChoice = Math.floor(Math.random() * 2);
    let stringBotChoice = botChoice === 0 ? "heads" : "tails";
    switch (choice) {
      case "head":
      case "heads":
      case "h":
        if (botChoice === 0) this.add(amount);
        else this.subtract(amount);
        return { win: botChoice === 0, coin: stringBotChoice };

      case "tail":
      case "tails":
      case "t":
        if (botChoice === 1) this.add(amount);
        else this.subtract(amount);
        return { win: botChoice === 1, coin: stringBotChoice };

      default:
        throw new Error(
          "Choice is not head (h or heads) or tail (t or tails)."
        );
    }
  }
}

module.exports = { DataBaseClient };
