import { observer } from 'mobx-react-lite';
import IOrderEntity from '../../store/IOrderEntity.ts';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import css from './Order.module.css';
import { untracked } from 'mobx';
import { useEffect } from 'react';

const Order = observer(({ order, vm }: { order: IOrderEntity; vm: OrdersVM }) => {
  const date = untracked(() => order.date);
  const hall = untracked(() => order.hallId);
  const seats = untracked(() => order.seats);

  useEffect(() => {
    vm.loadInfo(order.filmId);
  }, []);

  return (
    <li className={css.item}>
      <h2>Order at: {date}</h2>
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
          <p>{hall}</p>
        </div>

        <div className={css.info}>
          <p>Seats:</p>
          <p>{seats.join(', ')}</p>
        </div>
      </div>
      <button type="button" onClick={() => vm.deleteOrder(order.id)} className={css.btn}>
        Delete
      </button>
    </li>
  );
});

export default Order;
