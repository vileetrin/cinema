import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import CinemaPicker from '../CinemaPicker/CinemaPicker.tsx';
import { useParams } from 'react-router-dom';
import HallPicker from '../../halls/components/HallPicker/HallPicker.tsx';
import SeatsPicker from '../../halls/components/SeatsPicker/SeatsPicker.tsx';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import css from './BuyTicketsForm.module.css';
import { FormVM } from '../../ViewModels/FormVM.ts';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { IoPlayBackOutline } from 'react-icons/io5';
import { FormikHelpers } from 'formik/dist/types';

interface FormValues {
  cinema: number;
  hall: number;
  seats: number[];
}

const initialValues: FormValues = {
  cinema: 1,
  hall: 1,
  seats: [],
};

const BuyTicketsForm = observer(() => {
  const { hallsStore, ordersStore } = useStore();
  const { filmId } = useParams();
  const [step, setStep] = useState(1);

  const vm = useMemo(() => new FormVM(hallsStore, ordersStore), []);

  useEffect((): void => {
    if (filmId && initialValues.cinema) {
      vm.init(Number(initialValues.cinema), Number(filmId));
    }
  }, []);

  const handleNext = (): void => {
    setStep(step + 1);
  };

  const handlePrevious = (): void => {
    setStep(step - 1);
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>): void => {
    alert(`Your ticket:\nCinema: ${values.cinema}, hall: ${values.hall}, seats: ${values.seats.join(', ')}`);
    const order = {
      id: Math.random(),
      cinemaId: values.cinema,
      filmId: Number(filmId),
      hallId: values.hall,
      seats: values.seats,
      date: new Date().toLocaleString(),
    };
    vm.makeOrder(order);
    actions.resetForm();
    setStep(step + 1);
    vm.clearSelectedSeats();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          {step === 1 && (
            <>
              <CinemaPicker setFieldValue={setFieldValue} filmId={filmId} />
              <button type="button" onClick={(): void => handleNext()} className={css.btn}>
                <TbPlayerTrackNext />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {vm.getCinemaHalls(Number(values.cinema), Number(filmId)).length <= 0 ? (
                <>
                  <p>Sorry, we don`t have this film in this cinema :(</p>
                  <button type="button" onClick={(): void => handlePrevious()} className={css.btn}>
                    Back
                  </button>
                </>
              ) : (
                <>
                  <HallPicker
                    halls={vm.getCinemaHalls(Number(values.cinema), Number(filmId))}
                    setFieldValue={setFieldValue}
                  />
                  <button type="button" onClick={(): void => handlePrevious()} className={css.btn}>
                    <IoPlayBackOutline />
                  </button>
                  <button type="button" onClick={(): void => handleNext()} className={css.btn}>
                    <TbPlayerTrackNext />
                  </button>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <SeatsPicker
                seats={vm.getSeatsArray(Number(values.hall))}
                toggleSeat={seat => vm.toggleSeat(seat, Number(values.hall))}
                chosenSeats={vm.chosenSeats(Number(values.hall))}
                hallId={values.hall}
                filmId={filmId}
                orders={vm.orders}
                setFieldValue={setFieldValue}
              />
              <button type="button" onClick={(): void => handlePrevious()} className={css.btn}>
                <IoPlayBackOutline />
              </button>
              <button type="submit" className={css.btn}>
                Buy Tickets
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <h3> Thank you for order! :)</h3>
              <p>Go back to film list</p>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
});

export default BuyTicketsForm;
