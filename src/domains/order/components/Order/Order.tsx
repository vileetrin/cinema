import css from './Order.module.css';
import { observer } from 'mobx-react-lite';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import { useMemo } from 'react';

const Order = observer(({ orderId, vm }: { orderId: number; vm: OrdersVM }) => {
  const orderVm = useMemo(() => vm.getOrderVm(orderId), []);
  if (!orderVm) {
    return undefined;
  }

  const handleClick = () => {
    orderVm.deleteOrder();
    vm.reloadOrders();
  };

  console.log(orderId);

  return (
    <li className={css.item}>
      <h2>Order at: {orderVm.date}</h2>
      <div className={css.content}>
        <div className={css.info}>
          <p>Film:</p>
          <p>{orderVm.filmName}</p>
        </div>

        <div className={css.info}>
          <p>Cinema:</p>
          <p>{orderVm.cinemaAddress}</p>
        </div>

        <div className={css.info}>
          <p>Hall:</p>
          <p>{orderVm.hallNumber}</p>
        </div>

        <div className={css.info}>
          <p>Seats:</p>
          <p>{orderVm.seats}</p>
        </div>
      </div>
      <button type="button" onClick={() => handleClick()} className={css.btn}>
        Delete
      </button>
    </li>
  );
});

export default Order;

//
// interface OrderProps {
//   order: IOrderResponse;
//   vm: OrdersVM;
// }
//
// const Order: React.FC<OrderProps> = observer(({ order, vm }: OrderProps) => (
//   <li className={css.item}>
//     <h2>Order at: {order.order.date.toLocaleString()}</h2>
//     <div className={css.content}>
//       <div className={css.info}>
//         <p>Film:</p>
//         <p>{order.filmName}</p>
//       </div>
//
//       <div className={css.info}>
//         <p>Cinema:</p>
//         <p>{order.cinemaAddress}</p>
//       </div>
//
//       <div className={css.info}>
//         <p>Hall:</p>
//         <p>{order.order.hallId}</p>
//       </div>
//
//       <div className={css.info}>
//         <p>Seats:</p>
//         <p>{order.order.seats.join(', ')}</p>
//       </div>
//     </div>
//     <button type="button" onClick={(): Promise<void> => vm.deleteOrder(order.order.id)} className={css.btn}>
//       Delete
//     </button>
//   </li>
// ));
//
// export default Order;

// TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ))))))))))))))))))))))))))))))))))))