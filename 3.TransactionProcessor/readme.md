# Tasks comments

- Have a look to the code. Do you miss any class?

After having a look to the code, the principal class I miss is a model class, making easier to work with repetitive similar data, as transactions are. It simplifies validation work, and make sure the properties we are checking exists, while no other data is necessary for the processor


- Complete **./src/TransactionProcessor.js** class.

I decided to create a Transaction class, with transaction required properties, and one helper method implementing transaction validation logic. After it, I implemented TransactionProcessor class, trying to use the most clear code on it, and the info from the comments on the file

---

# Transactions Processor

We want to develop a new transactions processor library to complete online payments. **TransactionProcessor.js** file contains the code scaffolding of our new payments engine.

## Your tasks

- Have a look to the code. Do you miss any class?
- Complete **./src/TransactionProcessor.js** class.
- Make sure all tests pass. Would you include more tests?
- Do you know the pattern used by TransactionProcessor class?

We strongly recommend the use of: map, filter and reduce (among others).

You can use app.js file to play with TransactionProcessor class.

## Considerations

### Valid operations

Here you can find all array [operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

The following operations are **forbidden**:

- for
- foreach
- while

### Valid transactions

A valid transaction must have:

- A float number non-negative amount value (amount >= 0).
- One brand of: { "visa", "mastercard", "amex" }, lowercase.
- One currency of: { "EUR", "GBP", "USD" }, uppercase.
- An ID greater than zero integer value (id > 0).

## How to set up the project

To run the project, open a terminal and execute the following command from project root path:

- Install dependencies

> yarn

- Run the application

> yarn start

- Run tests

> yarn test
