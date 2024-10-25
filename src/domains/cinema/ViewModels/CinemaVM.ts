import CinemaStore from '../store/CinemaStore.ts';
import { CinemasServerRepo } from '../../../infrastructure/repos/CinemasServerRepo.ts';
import ICinemaEntity from '../store/ICinemaEntity.ts';
import { computed, makeObservable, observable } from 'mobx';

export class CinemaVM {
  private _cinemaStore: CinemaStore;

  constructor(cinemaStore: CinemaStore) {
    this._cinemaStore = cinemaStore;

    makeObservable(this, {
      init: observable,
      cinemas: computed,
    });
  }

  public init(): void {
    CinemasServerRepo.loadCinemas().then((cinemas: ICinemaEntity[]): void => {
      this._cinemaStore.setCinemas(cinemas);
    });
  }

  get cinemas(): Array<ICinemaEntity> {
    return this._cinemaStore.cinemas;
  }
}
