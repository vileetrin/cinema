import { observer } from 'mobx-react-lite';
import { Field } from 'formik';

interface SeatsPickerProps {
  seats: number[] | undefined;
  setFieldValue: (field: string, value: any) => void;
}

const SeatsPicker = observer(({ seats, setFieldValue }: SeatsPickerProps) => {
  return (
    <div>
      <h3>Choose seats:</h3>
      <div>
        {seats.map(seat => (
          <label key={seat}>
            <Field type="checkbox" name="seat" value={seat.toString()} />
            Место {seat}
          </label>
        ))}
      </div>
    </div>
  );
});

export default SeatsPicker;
