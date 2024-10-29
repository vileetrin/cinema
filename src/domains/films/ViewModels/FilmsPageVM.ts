import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import IFilmEntity from '../store/IFilmEntity.ts';
import { computed, makeObservable, observable } from 'mobx';
import FilmsStore from '../store/FilmsStore.ts';
import OrdersStore from '../../order/store/OrdersStore.ts';

export class FilmsPageVM {
  private _filmsStore: FilmsStore;
  private _ordersStore: OrdersStore;

  constructor(filmsStore: FilmsStore, ordersStore: OrdersStore) {
    this._filmsStore = filmsStore;
    this._ordersStore = ordersStore;
    makeObservable(this, {
      init: observable,
      films: computed,
    });
  }

  public init(): void {
    FilmsServerRepo.loadFilms().then((films: IFilmEntity[]): void => {
      this._filmsStore.setFilms(films);
    });
  }

  get films(): Array<IFilmEntity> {
    return this._filmsStore.films;
  }

  isWatched(filmId: number) {
    return !!this._ordersStore.orders.find(order => order.filmId === filmId);
  }
}
