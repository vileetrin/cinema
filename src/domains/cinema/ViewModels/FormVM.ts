import HallsStore from '../halls/store/HallsStore.ts';
import { HallsServerRepo } from '../../../infrastructure/repos/HallsServerRepo.ts';
import IHallEntity from '../halls/store/IHallEntity.ts';
import OrdersStore from '../../order/store/OrdersStore.ts';
import IOrderEntity from '../../order/store/IOrderEntity.ts';
import { action, computed, makeObservable, observable } from 'mobx';

import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';

export class FormVM {
  private _hallsStore: HallsStore;
  private _ordersStore: OrdersStore;

  constructor(hallsStore: HallsStore, ordersStore: OrdersStore) {
    this._hallsStore = hallsStore;
    this._ordersStore = ordersStore;
    makeObservable(this, {
      init: action,
      halls: computed,
      orders: computed,
      getCinemaHalls: observable,
      getHallSeats: observable,
      getSeatsArray: observable,
      makeOrder: action,
      toggleSeat: action,
      chosenSeats: observable,
      clearSelectedSeats: action,
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

  get orders() {
    return this._ordersStore.orders;
  }

  getCinemaHalls(cinemaId: number, filmId: number): IHallEntity[] {
    return this.halls.filter(hall => hall.cinemaId === cinemaId && hall.filmsId.includes(filmId));
  }

  getHallSeats(hallId: number): number | undefined {
    const hall = this.halls.find(hall => hallId === hall.id);
    return hall ? hall.seatsQuantity : undefined;
  }

  getSeatsArray(hallId: number): number[] {
    const seatsQuantity = this.getHallSeats(hallId);
    const seats: number[] = [];
    if (seatsQuantity) {
      for (let i = 1; i <= seatsQuantity; i++) {
        seats.push(i);
      }
    }
    return seats;
  }

  async makeOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
    // await this._ordersStore.addOrder(order);
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
}
