import { action, computed, makeObservable, observable } from 'mobx';
import IFilmEntity from './IFilmEntity.ts';

class FilmsStore {
    _films: IFilmEntity[] = [];

    constructor() {
        makeObservable(this, {
            _films: observable,
            films: computed,
            setFilms: action,
            getFilmById: observable,
        });
    }

    get films(): Array<IFilmEntity> {
        return this._films;
    }

    setFilms(films: Array<IFilmEntity>): void {
        this._films = films;

    }

    getFilmById(filmId: number): IFilmEntity | undefined {
        return this.films.find((film: IFilmEntity): boolean => film.id === filmId);
    }
}

export default FilmsStore;