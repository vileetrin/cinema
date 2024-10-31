import css from './Order.module.css';

import { observer } from 'mobx-react-lite';
import { untracked } from 'mobx';
import { useEffect } from 'react';

import IOrderEntity from '../../store/IOrderEntity.ts';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';

const Order = observer(({ order, vm }: { order: IOrderEntity; vm: OrdersVM }) => {
  const date: string = untracked((): string => order.date.toLocaleString());
  const hall: number = untracked((): number => order.hallId);
  const seats: number[] = untracked((): number[] => order.seats);

  useEffect((): void => {
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
      <button type="button" onClick={(): void => vm.deleteOrder(order.id)} className={css.btn}>
        Delete
      </button>
    </li>
  );
});

export default Order;
