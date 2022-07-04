import { IOrderInputJSON } from './model'
import { OrderBook } from './orderBook'

describe('orderBook.spec.ts', () => {
  it('input case 1 successfully', () => {
    const orderBook = new OrderBook()
    const inputs: IOrderInputJSON = {
      orders: [
        { command: 'sell', price: 100.003, amount: 2.4 },
        { command: 'buy', price: 90.394, amount: 3.445 }
      ]
    }

    for (const ob of inputs.orders) {
      orderBook.trigger(ob)
    }
    expect(orderBook.report()).toEqual({
      buy: [
        {
          price: 90.394,
          volume: 3.445
        }
      ],
      sell: [
        {
          price: 100.003,
          volume: 2.4
        }
      ]
    })
  })

  it('input case 2 successfully', () => {
    const orderBook = new OrderBook()
    const inputs: IOrderInputJSON = {

      orders: [
        { command: 'sell', price: 100.003, amount: 2.4 },
        { command: 'buy', price: 90.394, amount: 3.445 },
        { command: 'buy', price: 89.394, amount: 4.3 },
        { command: 'sell', price: 100.013, amount: 2.2 },
        { command: 'buy', price: 90.15, amount: 1.305 },
        { command: 'buy', price: 90.394, amount: 1.0 }
      ]

    }

    for (const ob of inputs.orders) {
      orderBook.trigger(ob)
    }
    expect(orderBook.report()).toEqual({
      buy: [
        {
          price: 90.394,
          volume: 4.445
        },
        {
          price: 90.15,
          volume: 1.305
        },
        {
          price: 89.394,
          volume: 4.3
        }
      ],
      sell: [
        {
          price: 100.003,
          volume: 2.4
        },
        {
          price: 100.013,
          volume: 2.2
        }
      ]
    })
  })

  it('input case 3 successfully', () => {
    const orderBook = new OrderBook()
    const inputs: IOrderInputJSON = {
      orders: [
        { command: 'sell', price: 100.003, amount: 2.4 },
        { command: 'buy', price: 90.394, amount: 3.445 },
        { command: 'buy', price: 89.394, amount: 4.3 },
        { command: 'sell', price: 100.013, amount: 2.2 },
        { command: 'buy', price: 90.15, amount: 1.305 },
        { command: 'buy', price: 90.394, amount: 1.0 },
        { command: 'sell', price: 90.394, amount: 2.2 }
      ]
    }

    for (const ob of inputs.orders) {
      orderBook.trigger(ob)
    }
    expect(orderBook.report()).toEqual({
      buy: [
        {
          price: 90.394,
          volume: 2.245
        },
        {
          price: 90.15,
          volume: 1.305
        },
        {
          price: 89.394,
          volume: 4.3
        }
      ],
      sell: [
        {
          price: 100.003,
          volume: 2.4
        },
        {
          price: 100.013,
          volume: 2.2
        }
      ]
    })
  })

  it('input case 4 successfully', () => {
    const orderBook = new OrderBook()
    const inputs: IOrderInputJSON = {
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

    for (const ob of inputs.orders) {
      orderBook.trigger(ob)
    }
    expect(orderBook.report()).toEqual({
      buy: [
        {
          price: 100.01,
          volume: 1.6
        },
        {
          price: 91.33,
          volume: 1.8
        },
        {
          price: 90.15,
          volume: 0.15000000000000013
        },
        {
          price: 89.394,
          volume: 4.3
        }
      ],
      sell: [
        {
          price: 100.013,
          volume: 2.2
        },
        {
          price: 100.15,
          volume: 3.8
        }
      ]
    })
  })

  it('should be throw error when wrong command', () => {
    const orderBook = new OrderBook()
    const inputs: IOrderInputJSON = {
      orders: [
        { command: 'selll', price: 100.003, amount: 2.4 },
        { command: 'buy', price: 90.394, amount: 3.445 }
      ]
    }
    expect(() => orderBook.trigger(inputs.orders[0])).toThrow(new Error('Not matching with command anything'))
  })
})
