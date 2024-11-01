import MockServer from './MockServer';
import IFilmResponse from '../../domains/films/store/IFilmResponse.ts';

export class FilmsServerRepo {
  static loadFilms = (): Promise<Array<IFilmResponse>> => MockServer.fetchFilms();
  static fetchFilm = (filmId: number): Promise<IFilmResponse> => MockServer.fetchFilm(filmId);
}
