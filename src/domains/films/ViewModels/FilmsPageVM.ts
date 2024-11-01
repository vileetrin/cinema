import { action, computed, makeObservable } from 'mobx';
import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import FilmsStore from '../store/FilmsStore.ts';
import IFilmResponse from '../store/IFilmResponse.ts';

export class FilmsPageVM {
  private _filmsStore: FilmsStore;

  constructor(filmsStore: FilmsStore) {
    this._filmsStore = filmsStore;
    makeObservable(this, {
      init: action,
      films: computed,
    });
  }

  public async init(): Promise<void> {
    await FilmsServerRepo.loadFilms().then((res: IFilmResponse[]): void => this._filmsStore.setFilms(res));
  }

  get films(): Array<IFilmResponse> {
    return this._filmsStore.films;
  }
}
