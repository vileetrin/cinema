import css from './FilmsPage.module.css';

import { observer } from 'mobx-react-lite';
import { untracked } from 'mobx';
import { useEffect, useMemo } from 'react';
import { useStore } from '../../../../infrastructure/StoreContext.ts';

import { FilmsPageVM } from '../../ViewModels/FilmsPageVM.ts';
import IFilmEntity from '../../store/IFilmEntity.ts';
import Film from '../../components/Film/Film.tsx';

const FilmsPage = observer(() => {
  const { filmsStore } = useStore();

  const vm = useMemo(() => {
    return new FilmsPageVM(filmsStore);
  }, []);

  useEffect((): void => {
    vm.init();
  }, [vm]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        <span className={css.part}>Films</span> List
      </h1>
      <ul className={css.list}>
        {vm.films.map((film: IFilmEntity) => {
          const key: number = untracked((): number => film.id);
          return (
            <li key={key} className={css.item}>
              <Film film={film} isWatched={vm.isWatched(film.id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default FilmsPage;
