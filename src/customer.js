export default class Customer {
  constructor(name) {
    this.name = name;
  }
  static all = [];

  static find(name) {
    return Customer.all.find((cust) => cust.name === name);
  }

  static create = (name) => {
    const customer = Customer.find(name);
    if (!customer) {
      const customer = new Customer(name);
      Customer.all.push(customer);
      return customer;
    }
    return customer;
  };
}
