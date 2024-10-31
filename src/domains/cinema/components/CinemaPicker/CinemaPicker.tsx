import css from './CinemaPicker.module.css';

import { Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { CinemaVM } from '../../ViewModels/CinemaVM.ts';
import ICinemaEntity from '../../store/ICinemaEntity.ts';
import { useStore } from '../../../../infrastructure/StoreContext.ts';

interface CinemaPickerProps {
  setFieldValue: (field: string, value: number) => void;
  filmId: string | undefined;
}

const CinemaPicker = observer(({ setFieldValue, filmId }: CinemaPickerProps) => {
  const { cinemaStore } = useStore();

  const vm = useMemo(() => {
    return new CinemaVM(cinemaStore);
  }, []);

  useEffect((): void => {
    vm.init(Number(filmId));
  }, []);

  const handleClick = (cinemaId: number): void => {
    setFieldValue('cinema', cinemaId);
    console.log('CINEMA IN PICKER', cinemaId);
  };

  return (
    <div className={css.container}>
      <h3>Choose cinema:</h3>
      <div className={css.radioToolbar}>
        {vm.cinemas.map((cinema: ICinemaEntity) => (
          <>
            <Field
              type="radio"
              name="cinema"
              value={cinema.id.toString()}
              id={`cinema - ${cinema.id}`}
              onClick={(): void => handleClick(cinema.id)}
            />
            <label key={cinema.id} htmlFor={`cinema - ${cinema.id}`}>
              {cinema.address}
            </label>
          </>
        ))}
      </div>
    </div>
  );
});

export default CinemaPicker;
