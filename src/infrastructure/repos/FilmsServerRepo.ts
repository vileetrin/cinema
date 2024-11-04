import MockServer from './MockServer';
import IFilmResponse from '../../domains/films/store/IFilmResponse.ts';
import IFilmsResponse from '../../domains/films/store/IFilmsResponse.ts';

export class FilmsServerRepo {
  static loadFilms = (page: number, pageSize: number): Promise<IFilmsResponse> => MockServer.fetchFilms(page, pageSize);
  static fetchFilm = (filmId: number): Promise<IFilmResponse> => MockServer.fetchFilm(filmId);
}
