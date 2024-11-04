import { action, computed, makeObservable } from 'mobx';
import IOrderResponse from '../store/IOrderResponse.ts';

type OrderVMTransport = {
  onDelete: (id: number) => void;
};

export class OrderVM {
  private _order: IOrderResponse;
  private _transport: OrderVMTransport;

  constructor(order: IOrderResponse, transport: OrderVMTransport) {
    this._order = order;
    this._transport = transport;
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
    // const orderId: number = this._order.order.id;
    this._transport.onDelete(this._order.order.id);
  }
}
