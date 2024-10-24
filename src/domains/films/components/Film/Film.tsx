import { observer } from 'mobx-react-lite';
import IFilmEntity from '../../store/IFilmEntity.ts';
import css from './Film.module.css';
import { Link } from 'react-router-dom';

const Film = observer(({ film }: { film: IFilmEntity }) => {

  return (
    <Link to={`/films/${film.id}`} className={css.item}>
      <img src={film.image} alt={film.name} className={css.img} />
      <div className={css.content}>
        <h3>{film.name}</h3>
        <p>{film.genre}</p>
      </div>
    </Link>
  );
});

export default Film;