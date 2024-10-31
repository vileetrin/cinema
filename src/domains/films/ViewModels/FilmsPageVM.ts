import { action, computed, makeObservable, observable } from 'mobx';
import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import IFilmEntity from '../store/IFilmEntity.ts';
import FilmsStore from '../store/FilmsStore.ts';

export class FilmsPageVM {
  private _filmsStore: FilmsStore;
  _watchedFilmIds: number[] = [];

  constructor(filmsStore: FilmsStore) {
    this._filmsStore = filmsStore;
    makeObservable(this, {
      init: action,
      films: computed,
      _watchedFilmIds: observable,
      setWatchedFilmIds: action,
    });
  }

  public async init(): Promise<void> {
    if (this.films.length === 0) {
      await FilmsServerRepo.loadFilms().then((films: IFilmEntity[]): void => {
        this._filmsStore.setFilms(films);
      });

      this._watchedFilmIds = await FilmsServerRepo.fetchWatchedFilmIds();
    }
  }

  get films(): Array<IFilmEntity> {
    return this._filmsStore.films;
  }

  get isWatched(): (filmId: number) => boolean {
    return (filmId: number) => this._watchedFilmIds.includes(filmId);
  }

  setWatchedFilmIds(ids: number[]) {
    this._watchedFilmIds = ids;
  }
}
