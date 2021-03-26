const db = require("quick.db");
const chalk = require("chalk");
const warn = require("./Warn");

class Item {
  constructor(item) {
    if (!item)
      throw new Error("Item must be specified! Example - new Item('gem');");
    this.item = item;
  }

  /**
   *
   * @param {String} id ID of the user to add the items to
   * @param {Number} amountInitial Amount of items to add
   */
  add = async (id, amountInitial) => {
    if (!id || !amountInitial)
      throw new Error(`ID and AMOUNT have to be given!`);

    let amount = parseInt(amountInitial);
    if (isNaN(amount)) throw new Error("AMOUNT should only be a number!");
    if (amount <= 0) warn("ADD AMOUNT is put as less than or equal to 0!");

    await db.add(`${id}.${this.item}`, amount);
  };

  /**
   *
   * @param {*} id ID of the user to subtract item from
   * @param {*} amountInitial Amount of items to subtract
   */
  subtract = async (id, amountInitial) => {
    if (!id || !amountInitial)
      throw new Error(`ID and AMOUNT have to be given!`);

    let amount = parseInt(amountInitial);
    if (isNaN(amount)) throw new Error("AMOUNT should only be a number!");
    if (amount >= 0) warn("SUBRACT AMOUNT is put as more than or equal to 0!");

    await db.add(`${id}.${this.item}`, -amount);
  };

  /**
   *
   * @param {*} id ID of user to fetch the items from
   * @return {integer} Amount of items of the user
   */
  fetch = (id) => {
    if (!id) throw new Error("ID has to be specified!");

    let items = db.get(`${id}.${this.item}`);
    if (items === undefined || items === null) items = 0;

    return items;
  };

  /**
   *
   * @param {OPTIONAL} Limit the limit of users to display the leaderboard
   * @return {array} Array of top users
   */
  leaderboard = (Limit) => {
    let limit = 0;

    if (!Limit) limit = 10;
    else limit = parseInt(Limit);

    if (limit <= 0 || isNaN(limit))
      throw new Error("Limit must be an integer greater than 0!");

    const lb = db
      .all()
      .sort((a, b) => b.data[`${this.item}`] - a.data[`${this.item}`])
      .map(
        (user, position) =>
          `#${position + 1} <@!${user.ID}>: ${user.data[`${this.item}`]} ${
            this.item
          }`
      );
    return lb.slice(0, limit);
  };

  /**
   *
   * @param {*} id ID of user to check the items
   * @param {*} Min Amount of items to check for
   * @return {boolean} true/false
   */
  has = (id, Min) => {
    if (!id) throw new Error("ID has to be specified!");
    if (!Min)
      throw new Error("Minium value has to be specified, followed by the ID!");

    let min = parseInt(Min);
    if (isNaN(min) || min <= 0)
      throw new Error("Minium value van only be a integer greater than 0!");

    if (db.get(`${id}.${this.item}`) >= min) return true;
    else return false;
  };

  /**
   *
   * @param {*} params {from: iD, to: ID, amount: AmountofItemsToTransfer}
   */
  transfer = async (params) => {
    if (!params)
      throw new SyntaxError(
        `Parameters are to be given!\n${chalk.yellow`Example`} - transfer({from: ID, to: ID, amount: AMOUNTtotransfer})`
      );

    if (!params.from || !params.to || !params.amount)
      throw new SyntaxError(
        `Parameters are to be given!\n${chalk.yellow`Example`} - transfer({from: ID, to: ID, amount: AMOUNTtotransfer})`
      );

    let Amount = parseInt(params.amount);
    if (isNaN(Amount) || Amount <= 0)
      throw new TypeError("Amount must be a integer greater than 0!");

    await db.add(`${params.from}.${this.item}`, -Amount);
    await db.add(`${params.to}.${this.item}`, Amount);
  };
}

module.exports = Item;
