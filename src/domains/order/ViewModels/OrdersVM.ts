import { computed, makeObservable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import FilmsStore from '../../films/store/FilmsStore.ts';
import CinemaStore from '../../cinema/store/CinemaStore.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;
  private _filmsStore: FilmsStore;
  private _cinemaStore: CinemaStore;

  // private repository: OrdersServerRepo;

  constructor(ordersStore: OrdersStore, filmsStore: FilmsStore, cinemaStore: CinemaStore) {
    this._ordersStore = ordersStore;
    this._filmsStore = filmsStore;
    this._cinemaStore = cinemaStore;
    makeObservable(this, {
      orders: computed,
    });
  }

  get orders(): IOrderEntity[] {
    return this._ordersStore.orders;
  }

  deleteOrder(orderId: number): void {
    this._ordersStore.deleteOrder(orderId);
  }

  getFilmName(filmId: number) {
    const film = this._filmsStore.films.find(film => film.id === filmId);
    if (film) {
      return film.name;
    }
  }

  getCinemaAddress(cinemaId: number) {
    const cinema = this._cinemaStore.cinemas.find(cinema => cinema.id === cinemaId);
    if (cinema) {
      return cinema.address;
    }
  }

  async fetchOrders(page: number, pageSize: number): Promise<IOrderEntity[]> {
    return await OrdersServerRepo.getOrders(page, pageSize);
  }

  async getTotalOrdersCount(): Promise<number> {
    return await OrdersServerRepo.getTotalOrdersCount();
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    await OrdersServerRepo.addOrder(order);
  }
}
