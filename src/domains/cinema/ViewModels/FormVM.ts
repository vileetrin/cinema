import { action, computed, makeObservable, observable } from 'mobx';

import HallsStore from '../halls/store/HallsStore.ts';
import { HallsServerRepo } from '../../../infrastructure/repos/HallsServerRepo.ts';
import IHallEntity from '../halls/store/IHallEntity.ts';
import OrdersStore from '../../order/store/OrdersStore.ts';
import IOrderEntity from '../../order/store/IOrderEntity.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
import IOrderResponse from '../../order/store/IOrderResponse.ts';

export class FormVM {
  private _hallsStore: HallsStore;
  private _ordersStore: OrdersStore;
  private _step: number = 1;
  public formData: { cinema: number; hall: number; seats: number[] } = {
    cinema: 0,
    hall: 0,
    seats: [],
  };

  constructor(hallsStore: HallsStore, ordersStore: OrdersStore) {
    this._hallsStore = hallsStore;
    this._ordersStore = ordersStore;
    makeObservable(this, {
      init: action,
      halls: computed,
      orders: computed,
      getHallSeats: observable,
      makeOrder: action,
      toggleSeat: action,
      chosenSeats: observable,
      clearSelectedSeats: action,
      nextStep: action,
      previousStep: action,
    });
  }

  public init(cinemaId: number, filmId: number): void {
    HallsServerRepo.loadHalls(cinemaId, filmId).then((halls: IHallEntity[]): void => {
      this._hallsStore.setHalls(halls);
    });
  }

  get halls(): IHallEntity[] {
    return this._hallsStore.halls;
  }

  get orders(): IOrderResponse[] {
    return this._ordersStore.orders;
  }

  getHallSeats(hallId: number): number | undefined {
    const hall: IHallEntity | undefined = this.halls.find((hall: IHallEntity): boolean => hallId === hall.id);
    return hall ? hall.seatsQuantity : undefined;
  }

  getSeatsArray(hallId: number): number[] {
    const seatsQuantity: number | undefined = this.getHallSeats(hallId);
    const seats: number[] = [];
    if (seatsQuantity) {
      for (let i: number = 1; i <= seatsQuantity; i++) {
        seats.push(i);
      }
    }
    return seats;
  }

  chosenSeats(hallId: number): number[] {
    return this._hallsStore.getSelectedSeats(hallId);
  }

  toggleSeat(seat: number, hallId: number): void {
    this._hallsStore.toggleSeat(hallId, seat);
  }

  clearSelectedSeats(): void {
    this._hallsStore.selectedSeats = [];
  }

  async makeOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
  }

  setFormData(values: object): void {
    this.formData = { ...this.formData, ...values };
  }

  nextStep(): void {
    this._step += 1;
  }

  previousStep(): void {
    this._step -= 1;
  }

  get step(): number {
    return this._step;
  }
}
