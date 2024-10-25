import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo } from 'react';
import { CinemaVM } from '../../ViewModels/CinemaVM.ts';
import { Field } from 'formik';

interface CinemaPickerProps {
  handleNext: () => void;
}

const CinemaPicker = observer(({ handleNext }: { handleNext: CinemaPickerProps }) => {
  const { cinemaStore } = useStore();

  const vm = useMemo(() => {
    return new CinemaVM(cinemaStore);
  }, []);

  useEffect(() => {
    vm.init();
  }, []);

  return (
    <>
      <h2>Choose cinema:</h2>
      {vm.cinemas.map(cinema => (
        <label>
          <Field type="radio" name="cinema" value={cinema.id} />
          {cinema.address}
        </label>
      ))}
      <button type="submit" onClick={handleNext}>
        Next
      </button>
    </>
  );
});

export default CinemaPicker;
