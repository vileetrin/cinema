import ICinemaEntity from './ICinemaEntity.ts';
import { action, computed, makeObservable, observable } from 'mobx';

class CinemaStore {
  _cinemas: ICinemaEntity[] = [];

  constructor() {
    makeObservable(this, {
      _cinemas: observable,
      cinemas: computed,
      setCinemas: action,
    });
  }

  get cinemas() {
    return this._cinemas;
  }

  setCinemas(cinemas: ICinemaEntity[]): void {
    this._cinemas = cinemas;
  }
}

export default CinemaStore;
