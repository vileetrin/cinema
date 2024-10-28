import { observer } from 'mobx-react-lite';
import css from './SeatsPicker.module.css';

interface SeatsPickerProps {
  seats: number[] | undefined;
  toggleSeat: (seat: number) => void;
  chosenSeats: number[];
  setFieldValue: (field: string, value: any) => void;
}

const SeatsPicker = observer(({ seats, toggleSeat, chosenSeats, setFieldValue }: SeatsPickerProps) => {
  console.log('Chosen seats:', chosenSeats);

  const handleSeatToggle = (seat: number) => {
    toggleSeat(seat);
    setFieldValue('seats', [...chosenSeats]);
  };

  return (
    <div className={css.container}>
      <h3>Choose seats:</h3>
      <div className={css.toolbar}>
        {seats?.map(seat => (
          <div key={seat}>
            <input
              type="checkbox"
              id={`seat-${seat}`}
              checked={chosenSeats.includes(seat)}
              onChange={() => handleSeatToggle(seat)}
            />
            <label htmlFor={`seat-${seat}`}>Seat {seat}</label>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SeatsPicker;
