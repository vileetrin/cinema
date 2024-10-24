import FilmsStore from "../store/FilmsStore.ts";
import {action, computed, makeObservable, observable} from "mobx";
import IFilmEntity from "../store/IFilmEntity.ts";


export class FilmDetailsPageVM {
    private _filmsStore: FilmsStore;
    _film: IFilmEntity | undefined = undefined;

    constructor(filmsStore: FilmsStore) {
        this._filmsStore = filmsStore;
        makeObservable(this, {
            _film: observable,
            film: computed,
            setFilm: action,
            getFilmById: action,
        });
    }

    setFilm(film: IFilmEntity | undefined) {
        this._film = film || undefined;
    }

    getFilmById(filmId: number) {
        const film = this._filmsStore.getFilmById(filmId);
        this.setFilm(film);
    }

    get film(){
        return this._film
    }
}

