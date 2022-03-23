import fs from "fs";
import Bank from "./src/bank.js";
import Loan from "./src/loan.js";
import Customer from "./src/customer.js";

const handleLoanRequest = (input) => {
  console.log("Processing Loan...");
  const loanDetails = input.split(" ");
  Bank.create(loanDetails[1]);
  Customer.create(loanDetails[2]);
  const loan = Loan.create(loanDetails);
  console.log(loan);
};

const handlePaymentRequest = (input) => {
  console.log(input);
  console.log("Processing Payment...");
  const paymentDetails = input.split(" ");
  const bank = paymentDetails[1];
  const customer = paymentDetails[2];
  const paidEmiCount = paymentDetails[4];
  const lumpSumAmount = paymentDetails[3];
  const loan = Loan.search(customer, bank);
  if (loan) {
    const payment = {
      lumpSumAmount: parseInt(lumpSumAmount),
      paidEmiCount: parseInt(paidEmiCount),
    };
    loan.amountPaid = payment;
    console.log(loan, loan.noOfEmisLeft);
  }
};

const handleBalance = (input) => {};

try {
  const data = fs.readFileSync("input.txt", "utf8");
  const inputs = data.split("\n").filter((n) => n);
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
        break;
      default:
        console.log("Invalid Tranaction type");
        break;
    }
  }
} catch (err) {
  console.error(err);
}
