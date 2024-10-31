import { action, computed, makeObservable, observable } from 'mobx';
import IOrderEntity from './IOrderEntity.ts';

class OrdersStore {
  _orders: IOrderEntity[] = [];
  _totalOrders: number = 0;
  _currentPage: number = 1;
  _pageSize: number = 5;

  constructor() {
    makeObservable(this, {
      _orders: observable,
      _totalOrders: observable,
      _currentPage: observable,
      orders: computed,
      setOrders: action,
      setTotalOrders: action,
      setCurrentPage: action,
    });
  }

  get orders(): IOrderEntity[] {
    return this._orders;
  }

  get totalOrders(): number {
    return this._totalOrders;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  setOrders(orders: IOrderEntity[]): void {
    this._orders = orders;
  }

  setTotalOrders(total: number): void {
    this._totalOrders = total;
  }

  setCurrentPage(page: number): void {
    this._currentPage = page;
  }
}

export default OrdersStore;
