import { observer } from 'mobx-react-lite';
import IOrderEntity from '../../store/IOrderEntity.ts';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import css from './Order.module.css';

const Order = observer(({ order, vm }: { order: IOrderEntity; vm: OrdersVM }) => {
  return (
    <li className={css.item}>
      <h2>Order at: {order.date}</h2>
      <div className={css.content}>
        <div className={css.info}>
          <p>Film:</p>
          <p>{vm.getFilmName(order.filmId)}</p>
        </div>

        <div className={css.info}>
          <p>Cinema:</p>
          <p>{vm.getCinemaAddress(Number(order.cinemaId))}</p>
        </div>

        <div className={css.info}>
          <p>Hall:</p>
          <p>{order.hallId}</p>
        </div>

        <div className={css.info}>
          <p>Seats:</p>
          <p>{order.seats.join(', ')}</p>
        </div>
      </div>
      <button type="button" onClick={() => vm.deleteOrder(order.id)} className={css.btn}>
        Delete
      </button>
    </li>
  );
});

export default Order;
