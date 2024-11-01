import { action, computed, makeObservable, observable } from 'mobx';
import IFilmEntity from '../store/IFilmEntity.ts';
import { FilmsServerRepo } from '../../../infrastructure/repos/FilmsServerRepo.ts';

export class FilmDetailsPageVM {
  _film: { film: IFilmEntity | undefined; isWatched: boolean } = { film: undefined, isWatched: false };

  constructor() {
    makeObservable(this, {
      _film: observable,
      film: computed,
      setFilm: action,
      initFilm: action,
    });
  }

  setFilm(film: { film: IFilmEntity | undefined; isWatched: boolean }): void {
    this._film = film || undefined;
  }

  get film(): { film: IFilmEntity | undefined; isWatched: boolean } {
    return this._film;
  }

  async initFilm(filmId: number): Promise<void> {
    await FilmsServerRepo.fetchFilm(filmId).then(res => this.setFilm(res));
  }
}
