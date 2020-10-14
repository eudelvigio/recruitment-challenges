const Transaction = require('./Transaction');

class TransactionProcessor {
  // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

  constructor(transactions) {
    this.transactions = transactions;
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

  // Return the total amount of current transactions array
  sum() {
    return this.transactions.reduce((acc, t) => acc + t.amount, 0);
  }
}

module.exports = TransactionProcessor;
