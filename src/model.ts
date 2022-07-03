
export interface IOrder {
    command: string,
    price: number,
    amount: number
}

export interface IOrderInputJSON {
    'orders': IOrder[]
}

export interface IOrderBookItem {
    price: number,
    volume: number
}

export interface IOrderBookState {
    [key: string]: IOrderBookItem[]
}

export enum Command {
    BUY = 'buy',
    SELL = 'sell'
}

export interface IOrderBook {
    trigger: (order: IOrder) => void
    report: () => IOrderBookState
}

export type CallbackFunction = (order: IOrder) => void
