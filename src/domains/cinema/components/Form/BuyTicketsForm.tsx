import { Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import CinemaPicker from '../CinemaPicker/CinemaPicker.tsx';

interface FormValues {
  cinema: number;
  hall: number;
}

const initialValues = {
  cinema: 1,
  hall: 1,
};

const BuyTicketsForm = observer(() => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (values: FormValues) => {
    setFormData({ ...formData, ...values });
    setStep(step + 1);
    console.log(formData);
  };

  // const handleSubmit = (values, actions: { resetForm: () => void }): void => {
  //   console.log(values);
  //   actions.resetForm();
  // };

  const handleSubmit = (values: FormValues) => {
    console.log('Final data:', { ...formData, ...values });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleSubmit }) => {
        return (
          <Form>
            {step === 1 && <CinemaPicker handleNext={() => handleNext(values)} />}

            {step === 2 && (
              <>
                <h3>Choose hall:</h3>
                {cinema => (
                  <label>
                    <Field type="radio" name="cinema" value={cinema.id} />
                    {cinema.address}
                  </label>
                )}
                <button type="submit" onClick={() => handleNext(values)}>
                  Next
                </button>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
});

export default BuyTicketsForm;
