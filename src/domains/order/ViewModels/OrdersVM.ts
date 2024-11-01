import { action, computed, makeObservable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
import IOrderResponse from '../store/IOrderResponse.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;

  constructor(ordersStore: OrdersStore) {
    this._ordersStore = ordersStore;
    makeObservable(this, {
      orders: computed,
      totalOrders: computed,
      currentPage: computed,
      loadOrders: action,
      addOrder: action,
      deleteOrder: action,
    });
  }

  get orders(): IOrderResponse[] {
    return this._ordersStore.orders;
  }

  get totalOrders(): number {
    return this._ordersStore.totalOrders;
  }

  get currentPage(): number {
    return this._ordersStore.currentPage;
  }

  async loadOrders(page: number): Promise<void> {
    const { orders, total } = await OrdersServerRepo.loadOrders(page, this._ordersStore._pageSize);
    this._ordersStore.setOrders(orders);
    this._ordersStore.setTotalOrders(total);
    this._ordersStore.setCurrentPage(page);
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    await this.loadOrders(this._ordersStore.currentPage);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await OrdersServerRepo.deleteOrder(orderId);
    await this.loadOrders(this._ordersStore.currentPage);
  }

  isLastPage() {
    return !(this.currentPage * this._ordersStore._pageSize < this.totalOrders);
  }

  isFirstPage() {
    return this.currentPage === 1;
  }
}
