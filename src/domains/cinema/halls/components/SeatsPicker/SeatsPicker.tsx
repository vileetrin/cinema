import { observer } from 'mobx-react-lite';
import { Field } from 'formik';
import { useState } from 'react';
import css from './SeatsPicker.module.css';

interface SeatsPickerProps {
  seats: number[] | undefined;
  setFieldValue: (field: string, value: any) => void;
}

const SeatsPicker = observer(({ seats, setFieldValue }: SeatsPickerProps) => {
  const [chosenSeats, setChosenSeats] = useState([]);

  const handleChange = (seat: number) => {
    setChosenSeats((prevSeats: number[]): number[] => {
      if (!prevSeats.includes(seat)) {
        return [...prevSeats, seat];
      }
      return prevSeats;
    });
  };

  return (
    <div className={css.container}>
      <h3>Choose seats:</h3>
      <div className={css.toolbar}>
        {seats.map(seat => (
          <>
            <Field
              type="checkbox"
              name="seat"
              id={`seat-${seat}`}
              value={seat.toString()}
              onClick={() => setFieldValue('seats', chosenSeats)}
              onChange={() => handleChange(seat)}
            />
            <label key={seat} htmlFor={`seat-${seat}`}>
              Seat {seat}
            </label>
          </>
        ))}
      </div>
    </div>
  );
});

export default SeatsPicker;
