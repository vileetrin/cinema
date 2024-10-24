import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo } from 'react';
import { FilmsPageVM } from '../../ViewModels/FilmsPageVM.ts';
import css from './FilmsPage.module.css';
import IFilmEntity from '../../store/IFilmEntity.ts';
import Film from '../../components/Film/Film.tsx';
import { untracked } from 'mobx';

const FilmsPage = observer(() => {
  const { filmsStore } = useStore();

  const vm = useMemo(() => {
    return new FilmsPageVM(filmsStore);
  }, []);

  useEffect(() => {
    vm.init();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}><span className={css.part}>Films</span> List</h1>
      <ul className={css.list}>
        {vm.films.map((film: IFilmEntity) => {
            const key: number = untracked((): number => film.id);
            return (
              <Film film={film} key={key} />
            );
          },
        )}
      </ul>
    </div>
  );
});

export default FilmsPage;