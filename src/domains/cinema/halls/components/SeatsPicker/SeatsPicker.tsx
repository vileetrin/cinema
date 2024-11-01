import css from './SeatsPicker.module.css';
import clsx from 'clsx';

import { observer } from 'mobx-react-lite';
import { Field } from 'formik';
import IOrderResponse from '../../../../order/store/IOrderResponse.ts';

interface SeatsPickerProps {
  seats: number[] | undefined;
  toggleSeat: (seat: number) => void;
  chosenSeats: number[];
  hallId: number;
  filmId: string | undefined;
  orders: IOrderResponse[];
  setFieldValue: (field: string, value: number[]) => void;
}

const SeatsPicker = observer(
  ({ seats, toggleSeat, chosenSeats, orders, hallId, filmId, setFieldValue }: SeatsPickerProps) => {
    const isChosen = (seat: number, hallId: number, filmId: number): boolean => {
      return !!orders.find(
        (order: IOrderResponse): boolean =>
          order.order.seats.includes(seat) && order.order.filmId === filmId && order.order.hallId === hallId
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
            const seatIsChosen = isChosen(seat, hallId, Number(filmId));
            return (
              <div key={seat}>
                <Field
                  type="checkbox"
                  id={`seat-${seat}`}
                  checked={chosenSeats.includes(seat)}
                  onChange={(): void => {
                    if (!seatIsChosen) {
                      handleSeatToggle(seat);
                    }
                  }}
                  disabled={seatIsChosen}
                />
                <label
                  htmlFor={`seat-${seat}`}
                  className={clsx({
                    [css.disabled]: seatIsChosen,
                  })}
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
