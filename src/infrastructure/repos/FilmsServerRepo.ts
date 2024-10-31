import MockServer from './MockServer';
import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';

export class FilmsServerRepo {
  static loadFilms = (): Promise<IFilmEntity[]> => MockServer.fetchFilms();
  static fetchWatchedFilmIds = (): Promise<number[]> => MockServer.fetchWatchedFilmIds();
}
