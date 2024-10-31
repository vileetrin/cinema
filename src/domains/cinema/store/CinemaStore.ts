import { action, computed, makeObservable, observable } from 'mobx';
import ICinemaEntity from './ICinemaEntity.ts';

class CinemaStore {
  _cinemas: ICinemaEntity[] = [];

  constructor() {
    makeObservable(this, {
      _cinemas: observable,
      cinemas: computed,
      setCinemas: action,
    });
  }

  get cinemas(): ICinemaEntity[] {
    return this._cinemas;
  }

  setCinemas(cinemas: ICinemaEntity[]): void {
    this._cinemas = cinemas;
  }
}

export default CinemaStore;
