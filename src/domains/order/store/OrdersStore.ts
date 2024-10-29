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

  async loadOrders(page: number = 1): Promise<void> {
    const { orders, total } = await OrdersServerRepo.loadOrders(page, this._pageSize);
    this._orders = orders;
    this._totalOrders = total;
    this._currentPage = page;
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    await this.loadOrders(this._currentPage);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await OrdersServerRepo.deleteOrder(orderId);
    await this.loadOrders(this._currentPage);
  }
}

export default OrdersStore;
