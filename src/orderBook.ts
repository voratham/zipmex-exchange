import { CallbackFunction, Command, IOrder, IOrderBook, IOrderBookState } from './model'

export class OrderBook implements IOrderBook {
  private store: IOrderBookState = { buy: [], sell: [] }

  public report = (): IOrderBookState => this.store

  private compareOrderSideByCommand = (command: string): CallbackFunction => {
    if (command === Command.SELL) {
      return this.compareBuy
    }

    if (command === Command.BUY) {
      return this.compareSell
    }

    throw Error('Not matching with command anything')
  }

  public trigger = (order: IOrder): void => {
    const compareOrderSide = this.compareOrderSideByCommand(order.command)
    compareOrderSide(order)
  }

  private sortByCommand = (command: Command) => {
    if (command === Command.BUY) {
      this.store[Command.SELL].sort((a, b) => a.price - b.price)
      return
    }

    if (command === Command.SELL) {
      this.store[Command.BUY].sort((a, b) => b.price - a.price)
    }
  }

  private compareBuy = (order: IOrder) => {
    const foundOrderCriteriaIndex = this.store?.[Command.SELL].findIndex(book => book.price >= order.price)
    if (foundOrderCriteriaIndex < 0) {
      const foundOrderCriteriaIndex = this.store?.[Command.SELL].findIndex(book => book.price === order.price)

      if (foundOrderCriteriaIndex < 0) {
        this.store[Command.SELL].push({
          price: order.price,
          volume: order.amount
        })
      } else {
        this.store[Command.SELL][foundOrderCriteriaIndex].volume += order.amount
      }

      this.sortByCommand(Command.BUY)
      return
    }

    const result = order.amount - this.store?.[Command.BUY][foundOrderCriteriaIndex].volume
    if (result >= 0) {
      const newData = this.store[Command.BUY].filter((_, index) => index !== foundOrderCriteriaIndex)
      this.store[Command.BUY] = newData
      order.amount = result
      this.compareBuy(order)
    } else {
      this.store[Command.BUY][foundOrderCriteriaIndex].volume = Math.abs(result)
    }
  }

  private compareSell = (order: IOrder) => {
    const foundOrderCriteriaIndex = this.store?.[Command.SELL].findIndex(book => book.price <= order.price)

    if (foundOrderCriteriaIndex < 0) {
      const orderIndexExists = this.store[Command.BUY].findIndex(book => book.price === order.price)

      if (orderIndexExists < 0) {
        this.store[Command.BUY].push({
          price: order.price,
          volume: order.amount
        })
      } else {
        this.store[Command.BUY][orderIndexExists].volume += order.amount
      }
      this.sortByCommand(Command.SELL)
      return
    }

    const result = order.amount - this.store?.[Command.SELL][foundOrderCriteriaIndex].volume
    if (result >= 0) {
      const newData = this.store[Command.SELL].filter((_, index) => index !== foundOrderCriteriaIndex)
      this.store[Command.SELL] = newData
      order.amount = result
      this.compareSell(order)
    } else {
      this.store[Command.SELL][foundOrderCriteriaIndex].volume = Math.abs(result)
    }
  }
}
