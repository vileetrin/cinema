import { action, computed, makeObservable, observable } from 'mobx';
import IHallEntity from './IHallEntity.ts';

class HallsStore {
  _halls: IHallEntity[] = [];
  selectedSeats: { [hallId: number]: number[] } = {};

  constructor() {
    makeObservable(this, {
      selectedSeats: observable,
      _halls: observable,
      halls: computed,
      setHalls: action,
      getSelectedSeats: observable,
      selectSeat: action,
      deselectSeat: action,
      toggleSeat: action,
    });
  }

  get halls(): Array<IHallEntity> {
    return this._halls;
  }

  setHalls(halls: Array<IHallEntity>): void {
    this._halls = halls;
  }

  selectSeat(hallId: number, seat: number): void {
    if (!this.selectedSeats[hallId]) {
      this.selectedSeats[hallId] = [];
    }
    if (!this.selectedSeats[hallId].includes(seat)) {
      this.selectedSeats[hallId].push(seat);
    }
  }

  deselectSeat(hallId: number, seat: number): void {
    if (this.selectedSeats[hallId]) {
      this.selectedSeats[hallId] = this.selectedSeats[hallId].filter((s: number): boolean => s !== seat);
    }
  }

  toggleSeat(hallId: number, seat: number): void {
    if (this.selectedSeats[hallId]?.includes(seat)) {
      this.deselectSeat(hallId, seat);
    } else {
      this.selectSeat(hallId, seat);
    }
  }

  getSelectedSeats(hallId: number): number[] {
    return this.selectedSeats[hallId] || [];
  }
}

export default HallsStore;
