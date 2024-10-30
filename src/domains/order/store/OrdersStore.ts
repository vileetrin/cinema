import { action, computed, makeObservable, observable } from 'mobx';
import IOrderEntity from './IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';

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
      loadOrders: action,
      addOrder: action,
      deleteOrder: action,
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

  async loadOrders(page: number): Promise<void> {
    const { orders, total } = await OrdersServerRepo.loadOrders(page, this._pageSize);
    // console.log('>>> loadOrders page, this._pageSize', page, this._pageSize);
    // console.log('<<< loadOrders page res, this._pageSize', orders, total);
    if (page === 1) {
      this._orders = orders;
      this._currentPage = page;
    } else {
      this._orders = [...this._orders, ...orders];
      this._currentPage += 1;
    }
    this._totalOrders = total;
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    await this.loadOrders(this._currentPage);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await OrdersServerRepo.deleteOrder(orderId);
    console.log('CURRENT PAGE: ', this._currentPage);
    await this.loadOrders(1);
  }
}

export default OrdersStore;
