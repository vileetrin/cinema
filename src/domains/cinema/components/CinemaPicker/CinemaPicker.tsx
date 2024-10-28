import { Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { CinemaVM } from '../../ViewModels/CinemaVM.ts';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo } from 'react';
import css from './CinemaPicker.module.css';
import ICinemaEntity from '../../store/ICinemaEntity.ts';

interface CinemaPickerProps {
  setFieldValue: (field: string, value: any) => void;
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
              onClick={() => setFieldValue('cinema', cinema.id)}
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
