# Tasks comments

- Have a look to the code. Do you miss any class?

After having a look to the code, the principal class I miss is a model class, making easier to work with repetitive similar data, as transactions are. It simplifies validation work, and make sure the properties we are checking exists, while no other data is necessary for the processor


- Complete **./src/TransactionProcessor.js** class.

I decided to create a Transaction class, with transaction required properties, and one helper method implementing transaction validation logic. After it, I implemented TransactionProcessor class, trying to use the most clear code on it, and the info from the comments on the file


- Make sure all tests pass. Would you include more tests?

I refactorized TransactionProcessor class to make all tests ok, and I have some comments:

1. It seems, by the tests, that TransactionProcessor class has a length property, I implemented it, but I think it also can be a typo when tester wrote the test

2. Most of new work was done on sum method, as it seems, according to tests, that the sum is done only with valid transactions from the transactions array, so I added that behaviour

3. Also, after having the sum with only valid transaction, I found an issue with number operation, having wrong results. The underlying issue is, like on 10-based numbers exist some values which can't be fully represented (i.e, 10/3 can't be exactly represented with a 10-based number), this also happens with double precision float numbers, which is the format used in js behind the scenes.
To solve it, I decide to add a new property to the class, precision, which indicates the max number of significant decimals will be taken in care. There are some drawbacks, as more precision, less big can numbers be, so if this processor should work with very big numbers while maintaining a high precission, extra actions should be done, BigInts can increase the precision and number bigness, or maybe using a library like decimal.js or similar.

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
