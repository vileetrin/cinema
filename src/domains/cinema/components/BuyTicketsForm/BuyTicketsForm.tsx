import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import CinemaPicker from '../CinemaPicker/CinemaPicker.tsx';
import { useParams } from 'react-router-dom';
import HallPicker from '../../halls/components/HallPicker/HallPicker.tsx';

// import SeatsPicker from '../../halls/components/SeatsPicker/SeatsPicker.tsx';

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
  const { filmId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormValues>(initialValues);

  const handleNext = (values: FormValues) => {
    setFormData({ ...values });
    setStep(step + 1);
  };

  const handleSubmit = () => {
    alert(`Cinema: ${formData.cinema}, hall: ${formData.hall}, seats: ${formData.seats.join(', ')}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          {step === 1 && (
            <>
              <CinemaPicker setFieldValue={setFieldValue} />
              <button type="button" onClick={() => handleNext(values)}>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <HallPicker cinemaId={Number(values.cinema)} filmId={Number(filmId)} setFieldValue={setFieldValue} />
              <button type="button" onClick={() => handleNext(values)}>
                Next
              </button>
            </>
          )}

          {step === 3 && (
            <>
              {/*<SeatsPicker seatsQuantity={values.hall} currentSeats={values.seat} setFieldValue={setFieldValue} />*/}
              <button type="submit">Buy Tickets</button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
});

export default BuyTicketsForm;
