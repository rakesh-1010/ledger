export default class Loan {
  constructor(bank, customer, principal, time, rate) {
    this.bank = bank;
    this.customer = customer;
    this.principal = principal;
    this.time = time;
    this.rate = rate;
    this.paid = 0;
  }

  get interest() {
    return this.calcInterest();
  }

  get amount() {
    return this.calcAmount();
  }

  get emi() {
    return this.calcEmi();
  }

  get noOfEmisLeft() {
    return Math.round((this.amount - this.paid) / this.emi);
  }

  set amountPaid(payment) {
    this.paid = this.emi * payment.paidEmiCount + payment.lumpSumAmount;
  }

  calcEmi() {
    return this.amount / (this.time * 12);
  }

  calcAmount() {
    return this.principal + this.interest;
  }

  calcInterest() {
    return (this.principal * this.rate * this.time) / 100;
  }

  static all = [];

  static create(loanDetails) {
    const principal = parseInt(loanDetails[3]);
    const rate = parseInt(loanDetails[5]);
    const time = parseInt(loanDetails[4]);
    const bank = loanDetails[1];
    const customer = loanDetails[2];
    const loan = new Loan(bank, customer, principal, time, rate);
    Loan.all.push(loan);
    return loan;
  }

  static search(customer, bank) {
    console.log(customer, bank);
    return Loan.all.find(
      (loan) => loan.bank === bank && loan.customer === customer
    );
  }
}
