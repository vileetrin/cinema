import { computed, makeObservable, observable } from 'mobx';

import CinemaStore from '../store/CinemaStore.ts';
import { CinemasServerRepo } from '../../../infrastructure/repos/CinemasServerRepo.ts';
import ICinemaEntity from '../store/ICinemaEntity.ts';

export class CinemaVM {
  private _cinemaStore: CinemaStore;

  constructor(cinemaStore: CinemaStore) {
    this._cinemaStore = cinemaStore;

    makeObservable(this, {
      init: observable,
      cinemas: computed,
    });
  }

  public init(filmId: number): void {
    CinemasServerRepo.loadCinemas(filmId).then((cinemas: ICinemaEntity[]): void => {
      this._cinemaStore.setCinemas(cinemas);
    });
  }

  get cinemas(): Array<ICinemaEntity> {
    return this._cinemaStore.cinemas;
  }
}
