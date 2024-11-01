import css from './FilmDetailsPage.module.css';

import { observer } from 'mobx-react-lite';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { FilmDetailsPageVM } from '../../ViewModels/FilmDetailsPageVM.ts';
import IFilmEntity from '../../store/IFilmEntity.ts';

const FilmDetailsPage = observer(() => {
  const { filmId } = useParams();

  const vm = useMemo(() => {
    return new FilmDetailsPageVM();
  }, []);

  useEffect((): void => {
    if (filmId) {
      vm.initFilm(Number(filmId));
    }
  }, [filmId]);

  const film: { film: IFilmEntity | undefined; isWatched: boolean } = vm.film;

  return (
    <>
      {film.film ? (
        <div className={css.container}>
          <div className={css.filmDetailscontainer}>
            <img src={film.film.image} alt={film.film.name} className={css.img} />
            <div className={css.content}>
              <div className={css.filmDetails}>
                <div className={css.nameContainer}>
                  <h2 className={css.title}>{film.film.name}</h2>
                  {film.isWatched && <p className={css.iswatched}>Watched!</p>}
                </div>
                <p>
                  <span className={css.part}>Genre:</span> {film.film.genre}
                </p>
                <p>{film.film.description}</p>
              </div>
              <NavLink to="order" className={css.link}>
                Make order
              </NavLink>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <p className={css.error}>Sorry, there is some error. Go back to films list page :(</p>
      )}
    </>
  );
});
export default FilmDetailsPage;
