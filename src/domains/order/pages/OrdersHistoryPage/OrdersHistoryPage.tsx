import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useEffect, useMemo } from 'react';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import Order from '../../components/Order/Order.tsx';
import css from './OrdersHistoryPage.module.css';

const OrdersHistoryPage = observer(() => {
  const { ordersStore, filmsStore, cinemaStore } = useStore();
  const vm = useMemo(() => new OrdersVM(ordersStore, filmsStore, cinemaStore), []);

  useEffect(() => {
    vm.loadOrders(vm.currentPage);
  }, [vm]);

  const handleLoadMore = () => {
    vm.loadOrders(vm.currentPage + 1);
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
      {vm.currentPage * ordersStore._pageSize < vm.totalOrders && (
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
});

export default OrdersHistoryPage;
