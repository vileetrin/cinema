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
      getCinemaHalls: observable,
      getHallSeats: observable,
      getSeatsArray: observable,
      makeOrder: action,
    });
  }

  public init(): void {
    HallsServerRepo.loadHalls().then((halls: IHallEntity[]): void => {
      this._hallsStore.setHalls(halls);
    });
  }

  get halls(): Array<IHallEntity> {
    return this._hallsStore.halls;
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
}
