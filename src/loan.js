export default class Loan {
  constructor(bank, customer, principal, time, rate) {
    this.bank = bank;
    this.customer = customer;
    this.principal = principal;
    this.time = time;
    this.rate = rate;
    this.payments = [];
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

  noOfEmisLeft(paid) {
    return Math.ceil((this.amount - paid) / this.emi);
  }

  amountPaid(emiNo) {
    const lumpSumAmount = this.payments.reduce((a, b) => +a + +b.lumpSumAmount, 0);
    if(this.payments.length > 0  && this.payments[0].paidEmiCount > emiNo) return emiNo * this.emi;
    return lumpSumAmount + emiNo * this.emi;
  }

  set payment(details) {
    if( details.lumpSumAmount > 0) this.payments.push(details);
  }

  calcEmi() {
    if(this.amount > 0) return Math.ceil(this.amount / (this.time * 12));
    return 0;
  }

  calcAmount() {
    if(this.time > 0) return this.principal + this.interest;
    return 0;
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
    return Loan.all.find(
      (loan) => loan.bank === bank && loan.customer === customer
    );
  }
}
