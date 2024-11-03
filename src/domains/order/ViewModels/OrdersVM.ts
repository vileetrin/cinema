import { action, computed, makeObservable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
import IOrderResponse from '../store/IOrderResponse.ts';
import { OrderVM } from './OrderVM.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;
  private orderVms = new Map<number, OrderVM>();

  constructor(ordersStore: OrdersStore) {
    this._ordersStore = ordersStore;
    makeObservable(this, {
      orders: computed,
      totalOrders: computed,
      currentPage: computed,
      loadOrders: action,
      addOrder: action,
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

  isLastPage() {
    return !(this.currentPage * this._ordersStore._pageSize < this.totalOrders);
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  reloadOrders() {
    this.loadOrders(this._ordersStore.currentPage);
  }

  getOrderVm(orderId: number): OrderVM | undefined {
    OrdersServerRepo.loadOrder(orderId).then(orderData => {
      if (orderData) {
        // console.log(orderData);
        this.orderVms.set(orderId, new OrderVM(orderData));
        // console.log(this.orderVms.get(orderId));
      }
    });
    console.log(this.orderVms.get(orderId));
    // console.log(this.orderVms, this.orderVms.get(orderId));

    return this.orderVms.get(orderId);
  }
}
