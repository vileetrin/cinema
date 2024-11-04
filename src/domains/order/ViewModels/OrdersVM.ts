import { action, computed, makeObservable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
import IOrderResponse from '../store/IOrderResponse.ts';
import { OrderVM } from './OrderVM.ts';
import Pagination from '../../../pagination/Pagination.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;
  _pagination: Pagination = new Pagination(5);

  constructor(ordersStore: OrdersStore) {
    this._ordersStore = ordersStore;
    makeObservable(this, {
      orders: computed,
      loadOrders: action,
      addOrder: action,
    });
  }

  get orders(): IOrderResponse[] {
    return this._ordersStore.orders;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  async loadOrders(page: number): Promise<void> {
    this._pagination.setCurrentPage(page);
    const { orders, total } = await OrdersServerRepo.loadOrders(
      this._pagination.currentPage,
      this._pagination._pageSize
    );
    this._ordersStore.setOrders(orders);
    this._pagination.setTotalItems(total);
    this._pagination.setCurrentPage(page);
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    await this.loadOrders(this._pagination.currentPage);
  }

  async removeOrdersById(orderId: number): Promise<void> {
    await OrdersServerRepo.deleteOrder(orderId);
    const orders: IOrderResponse[] = this._ordersStore._orders.filter(
      (order: IOrderResponse): boolean => order.order.id !== orderId
    );
    this._ordersStore.setOrders(orders);
    this.loadOrders(this._pagination.currentPage);
  }

  getOrderVm(orderId: number): OrderVM | undefined {
    const order: IOrderResponse | undefined = this._ordersStore._orders.find(
      (order: IOrderResponse): boolean => order.order.id === orderId
    );
    if (!order) {
      return undefined;
    }

    return new OrderVM(order, {
      onDelete: (id: number): void => {
        this.removeOrdersById(id);
      },
    });
  }
}
