import css from './FilmsPage.module.css';

import { observer } from 'mobx-react-lite';
import { untracked } from 'mobx';
import { useEffect, useMemo } from 'react';
import { useStore } from '../../../../infrastructure/StoreContext.ts';

import { FilmsPageVM } from '../../ViewModels/FilmsPageVM.ts';
import IFilmEntity from '../../store/IFilmEntity.ts';
import Film from '../../components/Film/Film.tsx';
import PreviousButton from '../../../order/components/Buttons/PreviousButton.tsx';
import NextButton from '../../../order/components/Buttons/NextButton.tsx';
import Pagination from '../../../../pagination/Pagination.ts';

const FilmsPage = observer(() => {
  const { filmsStore } = useStore();
  const vm = useMemo(() => {
    return new FilmsPageVM(filmsStore);
  }, []);

  useEffect((): void => {
    vm.init(pagination.currentPage);
  }, [vm]);

  const pagination: Pagination = vm.pagination;

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        <span className={css.part}>Films</span> List
      </h1>
      <ul className={css.list}>
        {vm.films.map((film: { film: IFilmEntity; isWatched: boolean }) => {
          const key: number = untracked((): number => film.film.id);
          return (
            <li key={key} className={css.item}>
              <Film film={film.film} isWatched={film.isWatched} />
            </li>
          );
        })}
      </ul>
      <div className={css.btnContainer}>
        <PreviousButton onClick={() => vm.init(pagination.currentPage - 1)} disabled={pagination.isFirstPage()} />
        <p>{pagination.currentPage}</p>
        <NextButton onClick={() => vm.init(pagination.currentPage + 1)} disabled={pagination.isLastPage()} />
      </div>
    </div>
  );
});

export default FilmsPage;
