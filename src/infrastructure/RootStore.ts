import FilmsStore from '../domains/films/store/FilmsStore.ts';
import CinemaStore from '../domains/cinema/store/CinemaStore.ts';
import HallsStore from '../domains/cinema/halls/store/HallsStore.ts';

class RootStore {
  filmsStore: FilmsStore;
  cinemaStore: CinemaStore;
  hallsStore: HallsStore;

  constructor() {
    this.filmsStore = new FilmsStore();
    this.cinemaStore = new CinemaStore();
    this.hallsStore = new HallsStore();
  }
}

export default RootStore;
