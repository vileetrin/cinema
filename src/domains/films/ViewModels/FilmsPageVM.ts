import { computed, makeObservable, observable } from 'mobx';

import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import IFilmEntity from '../store/IFilmEntity.ts';
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
      isWatched: observable,
    });
  }

  public init(): void {
    if (this.films.length === 0) {
      FilmsServerRepo.loadFilms().then((films: IFilmEntity[]): void => {
        this._filmsStore.setFilms(films);
      });
    }
  }

  get films(): Array<IFilmEntity> {
    return this._filmsStore.films;
  }

  isWatched(filmId: number): boolean {
    return !!this.getWatchedFilms().find((film: number): boolean => film === filmId);
  }

  getWatchedFilms(): number[] {
    return this._ordersStore.watchedFilms;
  }

  loadWatchedFilms(): void {
    this._ordersStore.setWatchedFilms();
  }
}
