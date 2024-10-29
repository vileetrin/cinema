import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo, useState } from 'react';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import Order from '../../components/Order/Order.tsx';
import css from './OrdersHistoryPage.module.css';

const OrdersHistoryPage = observer(() => {
  const { ordersStore, filmsStore, cinemaStore } = useStore();
  const vm = useMemo(() => new OrdersVM(ordersStore, filmsStore, cinemaStore), []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchInitialOrders = async () => {
      setLoading(true);
      await vm.loadOrders(1);
      setLoading(false);
    };
    fetchInitialOrders();
  }, [vm]);
  const loadMoreOrders = async () => {
    setLoading(true);
    await vm.loadOrders(vm.page + 1);
    setLoading(false);
  };

  return (
    <div className={css.container}>
      <h1>
        <span className={css.partTitle}>Orders</span> History
      </h1>
      <ul className={css.list}>
        {vm.orders.map(order => (
          <Order order={order} vm={vm} key={order.id} />
        ))}
      </ul>
      <button onClick={loadMoreOrders} disabled={loading} className={css.loadMoreButton}>
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
});
export default OrdersHistoryPage;
