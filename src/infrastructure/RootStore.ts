import FilmsStore from '../domains/films/store/FilmsStore.ts';
import CinemaStore from '../domains/cinema/store/CinemaStore.ts';

class RootStore {
  filmsStore: FilmsStore;
  cinemaStore: CinemaStore;

  constructor() {
    this.filmsStore = new FilmsStore();
    this.cinemaStore = new CinemaStore();
  }
}

export default RootStore;
