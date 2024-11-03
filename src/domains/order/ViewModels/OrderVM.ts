import { action, computed, makeObservable } from 'mobx';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
import IOrderResponse from '../store/IOrderResponse.ts';

export class OrderVM {
  private _order: IOrderResponse;

  constructor(order: IOrderResponse) {
    this._order = order;
    makeObservable(this, {
      date: computed,
      hallNumber: computed,
      seats: computed,
      filmName: computed,
      cinemaAddress: computed,
      deleteOrder: action,
    });
  }

  get date(): string {
    return this._order.order.date.toLocaleString();
  }

  get hallNumber(): number {
    return this._order.order.hallId;
  }

  get seats(): string {
    return this._order.order.seats.join(', ');
  }

  get cinemaAddress(): string | undefined {
    return this._order.cinemaAddress;
  }

  get filmName(): string | undefined {
    return this._order?.filmName;
  }

  async deleteOrder(): Promise<void> {
    const orderId = this._order.order.id;
    await OrdersServerRepo.deleteOrder(orderId);
    console.log(orderId);
  }
}
