import { observer } from 'mobx-react-lite';
import css from './SeatsPicker.module.css';
import IOrderEntity from '../../../../order/store/IOrderEntity.ts';
import { Field } from 'formik';

interface SeatsPickerProps {
  seats: number[] | undefined;
  toggleSeat: (seat: number) => void;
  chosenSeats: number[];
  hallId: number;
  filmId: string | undefined;
  orders: IOrderEntity[];
  setFieldValue: (field: string, value: any) => void;
}

const SeatsPicker = observer(
  ({ seats, toggleSeat, chosenSeats, orders, hallId, filmId, setFieldValue }: SeatsPickerProps) => {
    const isChosen = (seat: number, hallId: number, filmId: number): boolean => {
      return !!orders.find(
        (order: IOrderEntity): boolean =>
          order.seats.includes(seat) && order.filmId === filmId && order.hallId === hallId
      );
    };

    const handleSeatToggle = (seat: number): void => {
      toggleSeat(seat);

      setFieldValue('seats', [...chosenSeats]);
    };

    return (
      <div className={css.container}>
        <h3>Choose seats:</h3>
        <div className={css.toolbar}>
          {seats?.map((seat: number) => {
            return (
              <div key={seat}>
                <Field
                  type="checkbox"
                  id={`seat-${seat}`}
                  checked={chosenSeats.includes(seat)}
                  onChange={() => handleSeatToggle(seat)}
                />
                <label
                  htmlFor={`seat-${seat}`}
                  style={{
                    cursor: isChosen(seat, hallId, Number(filmId)) ? 'not-allowed' : undefined,
                    backgroundColor: isChosen(seat, hallId, Number(filmId)) ? 'lightgray' : undefined,
                    color: isChosen(seat, hallId, Number(filmId)) ? 'darkgray' : undefined,
                    borderColor: isChosen(seat, hallId, Number(filmId)) ? 'darkgray' : undefined,
                  }}
                >
                  Seat {seat}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default SeatsPicker;
