import ICinemaEntity from './ICinemaEntity.ts';
import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';

class CinemaStore {
  _cinemas: ICinemaEntity[] = [];

  constructor() {
    makeObservable(this, {
      _cinemas: observable,
      cinemas: computed,
      setCinemas: action,
      getFilmById: observable,
    });
  }

  get cinemas() {
    return this._cinemas;
  }

  setCinemas(cinemas: ICinemaEntity[]): void {
    this._cinemas = cinemas;
  }

  getFilmById(cinemaId: number): ICinemaEntity | undefined {
    return this.cinemas.find(
      (cinema: ICinemaEntity): boolean =>
        cinema.id === cinemaId
    );
  }
}

export default CinemaStore;
