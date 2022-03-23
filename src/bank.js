export default class Bank {
  constructor(name) {
    this.name = name;
  }
  static all = [];

  static find(name) {
    return Bank.all.find((bank) => bank.name === name);
  }

  static create = (name) => {
    const bank = Bank.find(name);
    if (!bank) {
      const bank = new Bank(name);
      Bank.all.push(bank);
      return bank;
    }
    return bank;
  };
}
