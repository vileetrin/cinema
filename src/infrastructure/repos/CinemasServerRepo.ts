import MockServer from './MockServer';
import ICinemaEntity from '../../domains/cinema/store/ICinemaEntity.ts';

export class CinemasServerRepo {
  static loadCinemas = (filmId: number): Promise<ICinemaEntity[]> => MockServer.fetchCinemas(filmId);
}
