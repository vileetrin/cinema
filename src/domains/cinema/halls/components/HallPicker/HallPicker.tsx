import { Field } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { useStore } from '../../../../../infrastructure/StoreContext.ts';
import { HallsVM } from '../../ViewModels/HallsVM.ts';
import IHallEntity from '../../store/IHallEntity.ts';

interface HallPickerProps {
  // cinemaId: number;
  // filmId: number;
  halls: IHallEntity[];
  setFieldValue: (field: string, value: any) => void;
}

const HallPicker: React.FC<HallPickerProps> = observer(({ halls, setFieldValue }) => {
  const { hallsStore } = useStore();

  const vm = useMemo(() => new HallsVM(hallsStore), []);

  useEffect(() => {
    vm.init();
  }, []);

  return (
    <div>
      <h3>Choose hall:</h3>
      {halls.map(hall => (
        <label key={hall.id}>
          <Field type="radio" name="hall" value={hall.id.toString()} onClick={() => setFieldValue('hall', hall.id)} />
          Зал {hall.id}
        </label>
      ))}
    </div>
  );
});

export default HallPicker;
