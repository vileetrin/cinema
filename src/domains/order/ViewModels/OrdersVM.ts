import { action, computed, makeObservable, observable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import FilmsStore from '../../films/store/FilmsStore.ts';
import CinemaStore from '../../cinema/store/CinemaStore.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;
  private _filmsStore: FilmsStore;
  private _cinemaStore: CinemaStore;

  constructor(ordersStore: OrdersStore, filmsStore: FilmsStore, cinemaStore: CinemaStore) {
    this._ordersStore = ordersStore;
    this._filmsStore = filmsStore;
    this._cinemaStore = cinemaStore;
    makeObservable(this, {
      orders: computed,
      totalOrders: computed,
      currentPage: computed,
      loadOrders: observable,
      deleteOrder: action,
      // getFilmName: observable,
      getCinemaAddress: observable,
    });
  }

  get orders(): IOrderEntity[] {
    return this._ordersStore.orders;
  }

  get totalOrders(): number {
    return this._ordersStore.totalOrders;
  }

  get currentPage(): number {
    return this._ordersStore.currentPage;
  }

  async loadOrders(page: number): Promise<void> {
    await this._ordersStore.loadOrders(page);
  }

  deleteOrder(orderId: number): void {
    this._ordersStore.deleteOrder(orderId);
  }

  getFilmName(filmId: number) {
    const film = this._filmsStore.films.find(film => film.id === filmId);
    console.log('>>> film', film);
    return film ? film.name : '';
  }

  getCinemaAddress(cinemaId: number) {
    const cinema = this._cinemaStore.cinemas.find(cinema => cinema.id === cinemaId);
    return cinema ? cinema.address : '';
  }
}
