import css from './Film.module.css';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import IFilmEntity from '../../store/IFilmEntity.ts';

const Film = observer(({ film, isWatched }: { film: IFilmEntity; isWatched: boolean }) => {
  return (
    <Link to={`/${film.id}`} className={css.item}>
      <img src={film.image} alt={film.name} className={css.img} />
      <div className={css.content}>
        <h3 className={css.text}>{film.name}</h3>
        <p className={css.text}>{film.genre}</p>
        {isWatched && <p className={css.iswatched}>Watched!</p>}
      </div>
    </Link>
  );
});

export default Film;
