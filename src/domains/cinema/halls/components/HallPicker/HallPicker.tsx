import { Field } from 'formik';
import { observer } from 'mobx-react-lite';
import IHallEntity from '../../store/IHallEntity.ts';
import css from './HallPicker.module.css';
import React from 'react';

interface HallPickerProps {
  halls: IHallEntity[];
  setFieldValue: (field: string, value: any) => void;
}

const HallPicker: React.FC<HallPickerProps> = observer(({ halls, setFieldValue }: HallPickerProps) => {
  // console.log(halls);
  return (
    <div className={css.container}>
      <h3>Choose hall:</h3>
      <div className={css.radioToolbar}>
        {halls.map((hall: IHallEntity) => (
          <>
            <Field
              type="radio"
              name="hall"
              value={hall.id.toString()}
              onClick={() => setFieldValue('hall', hall.id)}
              id={`hall-${hall.id}`}
            />
            <label key={hall.id} htmlFor={`hall-${hall.id}`}>
              Hall {hall.id}
            </label>
          </>
        ))}
      </div>
    </div>
  );
});

export default HallPicker;
