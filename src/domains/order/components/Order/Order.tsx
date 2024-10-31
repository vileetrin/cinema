import css from './Order.module.css';
import { observer } from 'mobx-react-lite';
import IOrderEntity from '../../store/IOrderEntity.ts';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';

interface OrderProps {
  order: IOrderEntity;
  vm: OrdersVM;
}

const Order: React.FC<OrderProps> = observer(({ order, vm }) => (
  <li className={css.item}>
    <h2>Order at: {order.date.toLocaleString()}</h2>
    <div className={css.content}>
      <div className={css.info}>
        <p>Film:</p>
        <p>{order.filmName}</p>
      </div>

      <div className={css.info}>
        <p>Cinema:</p>
        <p>{order.cinemaAddress}</p>
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
));

export default Order;
