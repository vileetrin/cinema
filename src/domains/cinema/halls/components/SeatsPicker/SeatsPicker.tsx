// import React from 'react';
// import { Field } from 'formik';
//
// interface SeatPickerProps {
//   hall: number;
//   setFieldValue: (field: string, value: number[]) => void;
//   selectedSeats: number[];
// }
//
// const SeatPicker: React.FC<SeatPickerProps> = ({ hall, setFieldValue, selectedSeats }) => {
//   const seatsQuantity = hallsvm.getCinemaHalls(Number(values.cinema)).find(hall => hall.id === Number(values.hall))!;
//   const handleSeatChange = (seatNumber: number) => {
//     const updatedSeats = selectedSeats.includes(seatNumber)
//       ? selectedSeats.filter(seat => seat !== seatNumber)
//       : [...selectedSeats, seatNumber];
//     setFieldValue('seat', updatedSeats);
//   };
//
//   return (
//     <div>
//       <h3>Выберите места:</h3>
//       {Array.from({ length: seatsQuantity }, (_, index) => (
//         <label key={index + 1}>
//           <Field
//             type="checkbox"
//             name="seat"
//             value={(index + 1).toString()}
//             onChange={() => handleSeatChange(index + 1)}
//             checked={selectedSeats.includes(index + 1)}
//           />
//           Место {index + 1}
//         </label>
//       ))}
//     </div>
//   );
// };
//
// export default SeatPicker;
