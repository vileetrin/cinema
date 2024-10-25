import { observer } from 'mobx-react-lite';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { FilmDetailsPageVM } from '../../ViewModels/FilmDetailsPageVM.ts';
import css from './FilmDetailsPage.module.css';

const FilmDetailsPage = observer(() => {
  const { filmId } = useParams();
  const { filmsStore } = useStore();

  const vm = useMemo(() => {
    return new FilmDetailsPageVM(filmsStore);
  }, []);

  useEffect(() => {
    vm.getFilmById(Number(filmId));
  }, []);

  const film = vm.film;

  return (
    <div className={css.container}>
      <div className={css.filmDetailscontainer}>
        <img src={film?.image} alt={film?.name} className={css.img} />
        <div className={css.content}>
          <div className={css.filmDetails}>
            <h2 className={css.title}>{film?.name}</h2>
            <p>
              <span className={css.part}>Genre:</span> {film?.genre}
            </p>
            <p>{film?.description}</p>
          </div>
          <NavLink to="order" className={css.link}>
            Make order
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
});

export default FilmDetailsPage;
