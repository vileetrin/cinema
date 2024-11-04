import { action, computed, makeObservable } from 'mobx';
import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import FilmsStore from '../store/FilmsStore.ts';
import IFilmResponse from '../store/IFilmResponse.ts';
import Pagination from '../../../pagination/Pagination.ts';

export class FilmsPageVM {
  private _filmsStore: FilmsStore;
  _pagination: Pagination = new Pagination(6);

  constructor(filmsStore: FilmsStore) {
    this._filmsStore = filmsStore;
    makeObservable(this, {
      init: action,
      films: computed,
    });
  }

  public async init(page: number): Promise<void> {
    this._pagination.setCurrentPage(page);
    const { films, total } = await FilmsServerRepo.loadFilms(this._pagination.currentPage, this._pagination._pageSize);
    this._filmsStore.setFilms(films);
    this._pagination.setTotalItems(total);
    this._pagination.setCurrentPage(page);
  }

  get films(): Array<IFilmResponse> {
    return this._filmsStore.films;
  }

  get pagination(): Pagination {
    return this._pagination;
  }
}
