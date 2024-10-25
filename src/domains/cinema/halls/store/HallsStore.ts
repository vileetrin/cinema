import { action, computed, makeObservable, observable } from 'mobx';
import IHallEntity from './IHallEntity.ts';

class HallsStore {
  _halls: IHallEntity[] = [];

  constructor() {
    makeObservable(this, {
      _halls: observable,
      halls: computed,
      setHalls: action,
    });
  }

  get halls(): Array<IHallEntity> {
    return this._halls;
  }

  setHalls(halls: Array<IHallEntity>): void {
    this._halls = halls;
  }
}

export default HallsStore;
