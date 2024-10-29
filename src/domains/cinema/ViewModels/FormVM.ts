import HallsStore from '../halls/store/HallsStore.ts';
import { HallsServerRepo } from '../../../infrastructure/repos/HallsServerRepo.ts';
import IHallEntity from '../halls/store/IHallEntity.ts';
import OrdersStore from '../../order/store/OrdersStore.ts';
import IOrderEntity from '../../order/store/IOrderEntity.ts';
import { action, computed, makeObservable, observable } from 'mobx';

export class FormVM {
  private _hallsStore: HallsStore;
  private _ordersStore: OrdersStore;

  constructor(hallsStore: HallsStore, ordersStore: OrdersStore) {
    this._hallsStore = hallsStore;
    this._ordersStore = ordersStore;
    makeObservable(this, {
      init: observable,
      halls: computed,
      orders: computed,
      getCinemaHalls: observable,
      getHallSeats: observable,
      getSeatsArray: observable,
      makeOrder: action,
      toggleSeat: action,
      chosenSeats: observable,
      clearSelectedSeats: action,
      // isChosen: observable,
    });
  }

  public init(cinemaId: number, filmId: number): void {
    HallsServerRepo.loadHalls(cinemaId, filmId).then((halls: IHallEntity[]): void => {
      this._hallsStore.setHalls(halls);
    });
  }

  get halls(): Array<IHallEntity> {
    return this._hallsStore.halls;
  }

  get orders() {
    return this._ordersStore.orders;
  }

  getCinemaHalls(cinemaId: number, filmId: number): IHallEntity[] {
    return this.halls.filter((hall: IHallEntity) => hall.cinemaId === cinemaId && hall.filmsId.includes(filmId));
  }

  getHallSeats(hallId: number): number | undefined {
    const hall: IHallEntity | undefined = this.halls.find((hall: IHallEntity): boolean => hallId === hall.id);
    if (!hall) {
      return undefined;
    } else {
      return hall.seatsQuantity;
    }
  }

  getSeatsArray(hallId: number) {
    const seatsQuantity: number | undefined = this.getHallSeats(hallId);
    const seats: number[] = [];
    if (seatsQuantity) {
      for (let i = 1; i < seatsQuantity + 1; i++) {
        seats.push(i);
      }
      return seats;
    }
  }

  makeOrder(order: IOrderEntity): void {
    this._ordersStore.addOrder(order);
  }

  chosenSeats(hallId: number): number[] {
    return this._hallsStore.getSelectedSeats(hallId);
  }

  toggleSeat(seat: number, hallId: number): void {
    this._hallsStore.toggleSeat(hallId, seat);
  }

  clearSelectedSeats() {
    this._hallsStore.selectedSeats = [];
  }

  // isChosen(hallId: number, filmId: number, seat: number) {
  //   return !!this.orders.find(
  //     order => order.seats.includes(seat) && order.hallId === hallId && order.filmId === filmId
  //   );
  // }

  // isChosen(seats: number[], filmId: number, hallId: number): boolean {
  //   return !!seats.find(seat =>
  //     this.orders.find(order => order.hallId === hallId && order.filmId === filmId && order.seats.includes(seat))
  //   );
  // }
}
