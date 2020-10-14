const Transaction = require('./Transaction');

class TransactionProcessor {
  // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

  constructor(transactions) {
    this.transactions = transactions;
    this.precission = 2;
  }

  print(tx) {
    console.log(
      `ID: ${tx.id} - Brand: ${tx.brand} - Currency: ${tx.currency} - Amount: ${tx.amount}`
    );
  }

  // Check valid transactions rules
  static isValidTransaction(transaction) {
    const t = new Transaction(transaction);
    return t.isValid();
  }

  // Remove invalid transactions
  filterInvalidTransactions() {
    const isValid = TransactionProcessor.isValidTransaction;
    this.transactions = this.transactions.filter(t => !isValid(t));
    return this;
  }

  // Return transactions of given currency
  getTransactionsByCurrency(currency) {
    this.transactions = this.transactions.filter(t => t.currency === currency);
    return this;
  }

  // Return transactions of given brand
  getTransactionsByBrand(brand) {
    this.transactions = this.transactions.filter(t => t.brand === brand);
    return this;
  }

  // BONUS:
  // Apply multiple filters. Filters parameter should be an array of functions (predicates)
  filterTransaction(filters) {
    if (!Array.isArray(filters)) return;

    filters.map(f => {
      if (f instanceof Function)
        this.transactions = this.transactions.filter(f);
        
    });
    return this;
  }

  // Return the total amount of current valid transactions array
  sum() {
    const isValid = TransactionProcessor.isValidTransaction;
    const validTransactions = this.transactions.filter(t => isValid(t));

    const preciseAmount = validTransactions.reduce((accumulator, transaction) => {
      // We use precission to power 10 the amount here, to work with integers only
      const preciseAmount = Math.round(transaction.amount * Math.pow(10, this.precission));
      return accumulator + preciseAmount;
    }, 0);

    // And here we recuperate the original number of decimal elements
    return preciseAmount / Math.pow(10, this.precission);
  }

  // Property returning current transactions array length
  get length() {
    return this.transactions.length;
  }
}

module.exports = TransactionProcessor;
