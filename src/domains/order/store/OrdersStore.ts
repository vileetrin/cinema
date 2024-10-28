import { action, computed, makeObservable, observable } from 'mobx';
import IOrderEntity from './IOrderEntity.ts';

class OrdersStore {
  _orders: IOrderEntity[] = [];

  constructor() {
    makeObservable(this, {
      _orders: observable,
      orders: computed,
      addOrder: action,
      deleteOrder: action,
    });
  }

  get orders(): Array<IOrderEntity> {
    return this._orders;
  }

  addOrder(order: IOrderEntity): void {
    this._orders.push(order);
  }

  deleteOrder(orderId: number): void {
    const index: number = this._orders.findIndex((o): boolean => o.id === orderId);
    if (index > -1) {
      this._orders.splice(index, 1);
    }
  }
}

export default OrdersStore;
