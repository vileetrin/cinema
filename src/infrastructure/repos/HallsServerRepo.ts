import MockServer from './MockServer';
import IHallEntity from '../../domains/cinema/halls/store/IHallEntity.ts';

export class HallsServerRepo {
  static loadHalls = (cinemaId: number, filmId: number): Promise<IHallEntity[]> =>
    MockServer.fetchHalls(cinemaId, filmId);
}
