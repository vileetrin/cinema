import css from './HallPicker.module.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Field } from 'formik';
import IHallEntity from '../../store/IHallEntity.ts';

interface HallPickerProps {
  halls: IHallEntity[];
  setFieldValue: (field: string, value: number) => void;
}

const HallPicker: React.FC<HallPickerProps> = observer(({ halls, setFieldValue }: HallPickerProps) => {
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
              onClick={(): void => setFieldValue('hall', hall.id)}
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
