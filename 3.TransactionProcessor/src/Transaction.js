class Transaction {
  constructor(t) {
    this.id = t.id;
    this.brand = t.brand;
    this.currency = t.currency;
    this.amount = t.amount;
  }

  isValid() {
    // For a transaction to be valid must have:
    let isValid = true;

    // An ID greater than zero integer value (id > 0).
    isValid = isValid && Number.isInteger(this.id) && this.id > 0;

    // One brand of: { "visa", "mastercard", "amex" }, lowercase.
    isValid = isValid && ["visa", "mastercard", "amex"].includes(this.brand);

    // One currency of: { "EUR", "GBP", "USD" }, uppercase.
    isValid = isValid && ["EUR", "GBP", "USD"].includes(this.currency);

    // A float number non-negative amount value (amount >= 0).
    isValid = isValid && !isNaN(this.amount) && this.amount >= 0;

    return isValid;
  }
}

module.exports = Transaction;