import { action, computed, makeObservable, observable } from 'mobx';
import IOrderEntity from './IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';

class OrdersStore {
  _orders: IOrderEntity[] = [];
  private _watchedFilms: number[] = [];
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

  get watchedFilms(): number[] {
    return this._watchedFilms;
  }

  async loadOrders(page: number): Promise<void> {
    const { orders, total } = await OrdersServerRepo.loadOrders(page, this._pageSize);
    this._orders = orders;
    this._currentPage = page;
    this._totalOrders = total;
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    await this.loadOrders(this._currentPage);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await OrdersServerRepo.deleteOrder(orderId);
    await this.loadOrders(this._currentPage);
  }

  async setWatchedFilms(): Promise<void> {
    const { watchedFilms } = await OrdersServerRepo.watchedFilms();
    this._watchedFilms = watchedFilms;
  }
}

export default OrdersStore;
