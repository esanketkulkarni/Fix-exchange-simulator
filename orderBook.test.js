const assert = require('assert');
const OrderBook = require('./orderBook');

const book = new OrderBook();
book.addOrder({ type: 'sell', price: 100, quantity: 5 });
const result = book.addOrder({ type: 'buy', price: 110, quantity: 3 });
assert.deepStrictEqual(result.trades, [{ price: 100, quantity: 3 }]);
assert.deepStrictEqual(book.getState(), {
  buys: [],
  sells: [{ type: 'sell', price: 100, quantity: 2 }],
});
console.log('All tests passed');
