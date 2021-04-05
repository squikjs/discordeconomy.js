const { DataBaseClient } = require("./DataBaseInterface");

class Balance {
  constructor(item) {
    if (!item)
      throw new Error("Item must be specified! Example - new Item('gem');");
    this.item = item;
  }

  /**
   *
   * @param {String} id
   * @param {Number} amount
   */
  add = async (id, amount) => {
    if (!id || !amount) {
      throw new Error(`ID and AMOUNT have to be given!`);
    }

    if (Number.isNaN(Number(amount))) {
      throw new Error("AMOUNT should only be a number!");
    }

    const db = new DataBaseClient(id, this.item);
    db.add(amount);
  };

  /**
   *
   * @param {String} id
   * @param {Number} amount
   */
  subtract = async (id, amount) => {
    if (!id || !amount) {
      throw new Error(`ID and AMOUNT have to be given!`);
    }

    if (Number.isNaN(Number(amount))) {
      throw new Error("AMOUNT should only be a number!");
    }

    const db = new DataBaseClient(id, this.item);
    db.subtract(amount);
  };

  /**
   *
   * @param {String} id
   * @return {Number}
   */
  fetch = (id) => {
    if (!id) throw new Error("ID has to be given!");

    const db = new DataBaseClient(id, this.item);
    return db.fetch();
  };

  /**
   * @param {Function} callback
   * @return {Array}
   */
  leaderboard = (callback) => {
    const db = new DataBaseClient(null, this.item);
    return db.leaderboard(callback);
  };

  /**
   *
   * @param {*} id
   * @param {*} amount
   * @return {boolean}
   */
  has = (id, amount) => {
    if (!id) throw new Error("ID has to be specified!");
    if (!amount)
      throw new Error("Minium value has to be specified, followed by the ID!");
    if (Number.isNaN(Number(amount)) || Number(amount) < 0)
      throw new Error(
        "Minium value van only be a integer greater than or equal to 0!"
      );

    const db = new DataBaseClient(id, this.item);
    return db.has(amount);
  };

  /**
   *
   * @param {Object} params
   */
  transfer = async (params) => {
    if (!params || !params.from || !params.to || !params.amount)
      throw new SyntaxError(
        `Parameters are to be given!\nExample - transfer({ from: ID, to: ID, amount: AMOUNT })`
      );

    const amount = Number(params.amount);
    if (Number.isNaN(amount) || amount <= 0)
      throw new TypeError("Amount must be a integer greater than 0!");

    const db = new DataBaseClient(params.from, this.item);
    db.transfer(params.to, amount);
  };

  /**
   *
   * @param {String} id
   * @param {Number} amount
   * @param {Array} items
   * @param {Number} num
   * @param {Boolean} autoDataBaseHandling [ OPTIONAL ]
   */
  slots = (id, amount, items, num) => {
    if (!id || !amount || !items || !num)
      throw new TypeError(`ID, AMOUNT, NUM and ITEMS have to be given!`);

    amount = typeof Number(amount) === "number" ? Number(amount) : 0;
    id = `${id}`;

    const db = new DataBaseClient(id, this.item);
    return db.slots(amount, items, num);
  };

  /**
   *
   * @param {*} id ID of user to add or subtract the coins
   * @param {*} amount Amount of coins to slots
   * @param {*} choice The user said haid or tail
   */
  coinflip = (id, amount, choice) => {
    if (!id || !amount) throw new Error(`ID and AMOUNT have to be given!`);

    const db = new DataBaseClient(id, this.item);
    return db.coinflip(amount, choice);
  };
}

module.exports = Balance;
