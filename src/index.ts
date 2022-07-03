import { IOrderInputJSON } from './model'
import { OrderBook } from './orderBook'

async function main () {
  const inputJson: IOrderInputJSON = {
    orders: [
      { command: 'sell', price: 100.003, amount: 2.4 },
      { command: 'buy', price: 90.394, amount: 3.445 },
      { command: 'buy', price: 89.394, amount: 4.3 },
      { command: 'sell', price: 100.013, amount: 2.2 },
      { command: 'buy', price: 90.15, amount: 1.305 },
      { command: 'buy', price: 90.394, amount: 1.0 },
      { command: 'sell', price: 90.394, amount: 2.2 },
      { command: 'sell', price: 90.15, amount: 3.4 },
      { command: 'buy', price: 91.33, amount: 1.8 },
      { command: 'buy', price: 100.01, amount: 4.0 },
      { command: 'sell', price: 100.15, amount: 3.8 }
    ]
  }

  const orderBook = new OrderBook()
  for (const order of inputJson.orders) {
    orderBook.trigger(order)
  }
  console.log('📊 Summary current order book')
  console.log(orderBook.report())
}

main()
