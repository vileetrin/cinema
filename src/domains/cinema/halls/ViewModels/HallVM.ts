import HallsStore from '../store/HallsStore.ts';
import { HallsServerRepo } from '../../../../infrastructure/repos/HallsServerRepo.ts';
import IHallEntity from '../store/IHallEntity.ts';

export class HallVM {
  private _hallsStore: HallsStore;

  constructor(hallsStore: HallsStore) {
    this._hallsStore = hallsStore;
  }

  public init(): void {
    HallsServerRepo.loadHalls().then((halls: IHallEntity[]): void => {
      this._hallsStore.setHalls(halls);
    });
  }

  get halls(): Array<IHallEntity> {
    return this._hallsStore.halls;
  }

  getCinemaHalls(cinemaId: number): IHallEntity[] {
    return this.halls.filter((hall: IHallEntity) => hall.cinemaId === cinemaId);
  }
}
