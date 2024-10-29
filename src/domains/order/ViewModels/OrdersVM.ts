import { action, computed, makeObservable, observable } from 'mobx';
import OrdersStore from '../store/OrdersStore.ts';
import IOrderEntity from '../store/IOrderEntity.ts';
import FilmsStore from '../../films/store/FilmsStore.ts';
import CinemaStore from '../../cinema/store/CinemaStore.ts';
import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';

export class OrdersVM {
  private _ordersStore: OrdersStore;
  private _filmsStore: FilmsStore;
  private _cinemaStore: CinemaStore;
  private _page: number = 1;

  constructor(ordersStore: OrdersStore, filmsStore: FilmsStore, cinemaStore: CinemaStore) {
    this._ordersStore = ordersStore;
    this._filmsStore = filmsStore;
    this._cinemaStore = cinemaStore;
    makeObservable(this, {
      orders: computed,
      page: computed,
      loadOrders: action,
      getFilmName: observable,
      getCinemaAddress: observable,
      deleteOrder: action,
    });
  }

  get orders(): IOrderEntity[] {
    return this._ordersStore.orders;
  }

  get page(): number {
    return this._page;
  }

  async loadOrders(page: number, pageSize: number = 2): Promise<void> {
    const orders = await OrdersServerRepo.getOrders(page, pageSize);
    orders.forEach(order => this._ordersStore.addOrder(order));
    this._page = page;
  }

  getFilmName(filmId: number) {
    const film = this._filmsStore.films.find(film => film.id === filmId);
    return film ? film.name : undefined;
  }

  getCinemaAddress(cinemaId: number) {
    const cinema = this._cinemaStore.cinemas.find(cinema => cinema.id === cinemaId);
    return cinema ? cinema.address : undefined;
  }

  deleteOrder(orderId: number): void {
    this._ordersStore.deleteOrder(orderId);
  }
}

export default OrdersVM;

// import { computed, makeObservable } from 'mobx';
// import OrdersStore from '../store/OrdersStore.ts';
// import IOrderEntity from '../store/IOrderEntity.ts';
// import FilmsStore from '../../films/store/FilmsStore.ts';
// import CinemaStore from '../../cinema/store/CinemaStore.ts';
//
// // import OrdersServerRepo from '../../../infrastructure/repos/OrdersServerRepo.ts';
//
// export class OrdersVM {
//   private _ordersStore: OrdersStore;
//   private _filmsStore: FilmsStore;
//   private _cinemaStore: CinemaStore;
//
//   constructor(ordersStore: OrdersStore, filmsStore: FilmsStore, cinemaStore: CinemaStore) {
//     this._ordersStore = ordersStore;
//     this._filmsStore = filmsStore;
//     this._cinemaStore = cinemaStore;
//     makeObservable(this, {
//       orders: computed,
//     });
//   }
//
//   get orders(): IOrderEntity[] {
//     return this._ordersStore.orders;
//   }
//
//   fetchOrders() {}
//
//   deleteOrder(orderId: number): void {
//     this._ordersStore.deleteOrder(orderId);
//   }
//
//   getFilmName(filmId: number) {
//     const film = this._filmsStore.films.find(film => film.id === filmId);
//     if (film) {
//       return film.name;
//     }
//   }
//
//   getCinemaAddress(cinemaId: number) {
//     const cinema = this._cinemaStore.cinemas.find(cinema => cinema.id === cinemaId);
//     if (cinema) {
//       return cinema.address;
//     }
//   }
//
//   // async fetchOrders(page: number, pageSize: number): Promise<IOrderEntity[]> {
//   //   return await OrdersServerRepo.getOrders(page, pageSize);
//   // }
//   //
//   // async getTotalOrdersCount(): Promise<number> {
//   //   return await OrdersServerRepo.getTotalOrdersCount();
//   // }
//   //
//   // async addOrder(order: IOrderEntity): Promise<void> {
//   //   await OrdersServerRepo.addOrder(order);
//   // }
// }
