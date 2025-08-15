class OrderBook {
  constructor() {
    this.buys = [];
    this.sells = [];
  }

  addOrder(order) {
    const { type, price, quantity } = order;
    if (!['buy', 'sell'].includes(type)) {
      throw new Error('Invalid order type');
    }
    if (typeof price !== 'number' || typeof quantity !== 'number') {
      throw new Error('Price and quantity must be numbers');
    }
    const trades = [];
    if (type === 'buy') {
      this.sells.sort((a, b) => a.price - b.price);
      while (order.quantity > 0 && this.sells.length && this.sells[0].price <= price) {
        const best = this.sells[0];
        const qty = Math.min(order.quantity, best.quantity);
        trades.push({ price: best.price, quantity: qty });
        order.quantity -= qty;
        best.quantity -= qty;
        if (best.quantity === 0) {
          this.sells.shift();
        }
      }
      if (order.quantity > 0) {
        this.buys.push({ type, price, quantity: order.quantity });
        this.buys.sort((a, b) => b.price - a.price);
      }
    } else {
      this.buys.sort((a, b) => b.price - a.price);
      while (order.quantity > 0 && this.buys.length && this.buys[0].price >= price) {
        const best = this.buys[0];
        const qty = Math.min(order.quantity, best.quantity);
        trades.push({ price: best.price, quantity: qty });
        order.quantity -= qty;
        best.quantity -= qty;
        if (best.quantity === 0) {
          this.buys.shift();
        }
      }
      if (order.quantity > 0) {
        this.sells.push({ type, price, quantity: order.quantity });
        this.sells.sort((a, b) => a.price - b.price);
      }
    }
    return { trades, book: this.getState() };
  }

  getState() {
    return { buys: this.buys, sells: this.sells };
  }
}

module.exports = OrderBook;
