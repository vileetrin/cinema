import IFilmResponse from './IFilmResponse.ts';

export default interface IFilmsResponse {
  films: IFilmResponse[];
  total: number;
}
