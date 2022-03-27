import fs from "fs";
import Bank from "./src/bank.js";
import Loan from "./src/loan.js";
import Customer from "./src/customer.js";

const handleLoanRequest = (input) => {
  const loanDetails = input.split(" ");
  Bank.create(loanDetails[1]);
  Customer.create(loanDetails[2]);
  Loan.create(loanDetails);
};

const handlePaymentRequest = (input) => {
  const paymentDetails = input.split(" ");
  const bank = paymentDetails[1];
  const customer = paymentDetails[2];
  const paidEmiCount = paymentDetails[4];
  const lumpSumAmount = paymentDetails[3];
  const loan = Loan.search(customer, bank);
  if (loan) {
    const paymentObj = {
      lumpSumAmount: parseInt(lumpSumAmount),
      paidEmiCount: parseInt(paidEmiCount),
    };
    loan.payment = paymentObj;
  }
};

const handleBalance = (input) => {
  const balanceRequest = input.split(" ");
  const bank = balanceRequest[1];
  const customer = balanceRequest[2];
  const paidEmiCount = balanceRequest[3];
  const loan = Loan.search(customer, bank);
  if (loan) {
    const paymentObj = {
      lumpSumAmount: 0,
      paidEmiCount: parseInt(paidEmiCount),
    };
    loan.payment = paymentObj;
    const paid = loan.amountPaid(paidEmiCount)
    console.log(loan.bank, loan.customer, paid, loan.noOfEmisLeft(paid));
    output.push(`${loan.bank}, ${loan.customer}, ${paid}, ${loan.noOfEmisLeft(paid)}`)
  }
};

export const ledger = (inputs) => {
  try {
    for (let input of inputs) {
      const transactionType = input.split(" ")[0];
      switch (transactionType) {
        case "LOAN":
          handleLoanRequest(input);
          break;
        case "PAYMENT":
          handlePaymentRequest(input);
          break;
        case "BALANCE":
          handleBalance(input);
          console.log(output);
          break;
        default:
          console.log("Invalid Tranaction type");
          break;
      }
    }
  } catch (err) {
    console.error(err);
  }  
}

const readInput = () => {
  const data = fs.readFileSync("input.txt", "utf8");
  const inputs = data.split("\n").filter((n) => n);
  console.log(inputs);
  ledger(inputs);
}

const output = [];
readInput();
