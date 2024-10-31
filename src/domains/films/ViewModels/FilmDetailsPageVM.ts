import { action, computed, makeObservable, observable } from 'mobx';
import IFilmEntity from '../store/IFilmEntity.ts';
import FilmsStore from '../store/FilmsStore.ts';

export class FilmDetailsPageVM {
  private _filmsStore: FilmsStore;
  _film: IFilmEntity | undefined = undefined;

  constructor(filmsStore: FilmsStore) {
    this._filmsStore = filmsStore;
    makeObservable(this, {
      _film: observable,
      film: computed,
      setFilm: action,
      getFilmById: action,
    });
  }

  setFilm(film: IFilmEntity | undefined): void {
    this._film = film || undefined;
  }

  getFilmById(filmId: number): void {
    const film: IFilmEntity | undefined = this._filmsStore.getFilmById(filmId);
    this.setFilm(film);
  }

  get film(): IFilmEntity | undefined {
    return this._film;
  }
}
