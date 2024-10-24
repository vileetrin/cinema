import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';
import IFilmEntity from '../store/IFilmEntity.ts';
import { computed, makeObservable, observable } from 'mobx';
import FilmsStore from '../store/FilmsStore.ts';

export class FilmsPageVM {
  private _filmsStore: FilmsStore;

  constructor(filmsStore: FilmsStore) {
    this._filmsStore = filmsStore;
    makeObservable(this, {
      init: observable,
      films: computed,
    });
  }

  public init(): void {
    FilmsServerRepo.loadFilms()
      .then((films: IFilmEntity[]): void => {
        this._filmsStore.setFilms(films);
      });
  }

  get films(): Array<IFilmEntity> {
    return this._filmsStore.films;
  }
}