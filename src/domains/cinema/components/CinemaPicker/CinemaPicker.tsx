import { Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { CinemaVM } from '../../ViewModels/CinemaVM.ts';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo } from 'react';

interface CinemaPickerProps {
  setFieldValue: (field: string, value: any) => void;
}

const CinemaPicker = observer(({ setFieldValue }: CinemaPickerProps) => {
  const { cinemaStore } = useStore();

  const vm = useMemo(() => {
    return new CinemaVM(cinemaStore);
  }, []);

  useEffect(() => {
    vm.init();
  }, []);

  return (
    <div>
      <h3>Choose cinema:</h3>
      {vm.cinemas.map(cinema => (
        <label key={cinema.id}>
          <Field
            type="radio"
            name="cinema"
            value={cinema.id.toString()}
            onClick={() => setFieldValue('cinema', cinema.id)}
          />
          {cinema.address}
        </label>
      ))}
    </div>
  );
});

export default CinemaPicker;
