import { action, computed, makeObservable, observable } from 'mobx';
import IOrderResponse from './IOrderResponse.ts';

class OrdersStore {
  _orders: Array<IOrderResponse> = [];

  constructor() {
    makeObservable(this, {
      _orders: observable,
      orders: computed,
      setOrders: action,
    });
  }

  get orders(): IOrderResponse[] {
    return this._orders;
  }

  setOrders(orders: IOrderResponse[]): void {
    this._orders = orders;
  }
}

export default OrdersStore;
