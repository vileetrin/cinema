import { action, computed, makeObservable, observable } from 'mobx';
import IFilmResponse from './IFilmResponse.ts';

class FilmsStore {
  _films: Array<IFilmResponse> = [];

  constructor() {
    makeObservable(this, {
      _films: observable,
      films: computed,
      setFilms: action,
    });
  }

  get films(): Array<IFilmResponse> {
    return this._films;
  }

  setFilms(films: Array<IFilmResponse>): void {
    this._films = films;
  }
}

export default FilmsStore;
