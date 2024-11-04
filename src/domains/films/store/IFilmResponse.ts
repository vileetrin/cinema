import IFilmEntity from './IFilmEntity.ts';

export default interface IFilmResponse {
  film: IFilmEntity;
  isWatched: boolean;
}
