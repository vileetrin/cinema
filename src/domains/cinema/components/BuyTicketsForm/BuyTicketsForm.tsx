import css from './BuyTicketsForm.module.css';

import { Form, Formik, FormikProps } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { IoPlayBackOutline } from 'react-icons/io5';

import CinemaPicker from '../CinemaPicker/CinemaPicker.tsx';
import HallPicker from '../../halls/components/HallPicker/HallPicker.tsx';
import SeatsPicker from '../../halls/components/SeatsPicker/SeatsPicker.tsx';

import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { FormVM } from '../../ViewModels/FormVM.ts';

interface FormValues {
  cinema: number;
  hall: number;
  seats: number[];
}

const BuyTicketsForm = observer(() => {
  const { hallsStore, ordersStore } = useStore();
  const { filmId } = useParams();
  const [step, setStep] = useState(1);

  const vm = useMemo(() => new FormVM(hallsStore, ordersStore), [hallsStore, ordersStore]);

  const handleNext = (values: FormValues): void => {
    vm.setFormData(values);
    setStep((prevStep: number): number => prevStep + 1);
  };

  const handlePrevious = (): void => {
    setStep((prevStep: number): number => prevStep - 1);
  };

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>): Promise<void> => {
    alert(`Your ticket:\nCinema: ${values.cinema}, hall: ${values.hall}, seats: ${values.seats.join(', ')}`);

    const order = {
      id: Math.random() * 200,
      cinemaId: Number(values.cinema),
      filmId: Number(filmId),
      hallId: values.hall,
      seats: values.seats,
      date: new Date(),
    };

    await vm.makeOrder(order);
    actions.resetForm();
    setStep(4);
    vm.clearSelectedSeats();
  };

  return (
    <Formik initialValues={vm.formData} onSubmit={handleSubmit}>
      {({ values, setFieldValue }: FormikProps<FormValues>) => {
        useEffect((): void => {
          vm.setFormData(values);
          vm.init(Number(vm.formData.cinema), Number(filmId));
        }, [values.cinema]);

        return (
          <Form>
            {step === 1 && (
              <>
                <CinemaPicker setFieldValue={setFieldValue} filmId={filmId} />
                <button type="button" onClick={(): void => handleNext(values)} className={css.btn}>
                  <TbPlayerTrackNext />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {vm.halls.length <= 0 ? (
                  <>
                    <p>Sorry, we don’t have this film in this hall :(</p>
                    <button type="button" onClick={handlePrevious} className={css.btn}>
                      <IoPlayBackOutline />
                    </button>
                  </>
                ) : (
                  <>
                    <HallPicker halls={vm.halls} setFieldValue={setFieldValue} />
                    <button type="button" onClick={handlePrevious} className={css.btn}>
                      <IoPlayBackOutline />
                    </button>
                    <button type="button" onClick={(): void => handleNext(values)} className={css.btn}>
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
                  toggleSeat={(seat: number): void => vm.toggleSeat(seat, Number(values.hall))}
                  chosenSeats={vm.chosenSeats(Number(values.hall))}
                  hallId={values.hall}
                  filmId={filmId}
                  orders={vm.orders}
                  setFieldValue={setFieldValue}
                />
                <button type="button" onClick={handlePrevious} className={css.btn}>
                  <IoPlayBackOutline />
                </button>
                <button type="submit" className={css.btn}>
                  Buy Tickets
                </button>
              </>
            )}

            {step === 4 && (
              <>
                <h3>Thank you for your order! :)</h3>
                <p>Go back to the film list</p>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
});

export default BuyTicketsForm;
