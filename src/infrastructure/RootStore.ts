import FilmsStore from '../domains/films/store/FilmsStore.ts';
import CinemaStore from '../domains/cinema/store/CinemaStore.ts';
import HallsStore from '../domains/cinema/halls/store/HallsStore.ts';
import OrdersStore from '../domains/order/store/OrdersStore.ts';

class RootStore {
  filmsStore: FilmsStore;
  cinemaStore: CinemaStore;
  hallsStore: HallsStore;
  ordersStore: OrdersStore;

  constructor() {
    this.filmsStore = new FilmsStore();
    this.cinemaStore = new CinemaStore();
    this.hallsStore = new HallsStore();
    this.ordersStore = new OrdersStore();
  }
}

export default RootStore;
