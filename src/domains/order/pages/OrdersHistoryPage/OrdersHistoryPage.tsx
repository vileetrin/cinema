import css from './OrdersHistoryPage.module.css';

import { observer } from 'mobx-react-lite';
import { untracked } from 'mobx';
import { useEffect, useMemo } from 'react';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { IoPlayBackOutline } from 'react-icons/io5';

import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import Order from '../../components/Order/Order.tsx';

const OrdersHistoryPage = observer(() => {
  const { ordersStore, filmsStore, cinemaStore } = useStore();
  const vm = useMemo(() => new OrdersVM(ordersStore, filmsStore, cinemaStore), []);

  const notAllowedPrev = vm.currentPage === 1;
  const notAllowedNext = !(vm.currentPage * ordersStore._pageSize < vm.totalOrders);

  useEffect(() => {
    vm.loadOrders(vm.currentPage);
  }, []);

  const handleNext = (): void => {
    if (vm.currentPage * ordersStore._pageSize < vm.totalOrders) {
      const page: number = vm.currentPage + 1;
      vm.loadOrders(page);
    }
  };

  const handlePrevious = (): void => {
    if (vm.currentPage !== 1) {
      const page: number = vm.currentPage - 1;
      vm.loadOrders(page);
    }
  };

  return (
    <div className={css.container}>
      <h1>
        <span className={css.partTitle}>Orders</span> History
      </h1>
      <ul className={css.list}>
        {vm.orders.map(order => {
          const key = untracked(() => order.id);
          return <Order order={order} vm={vm} key={key} />;
        })}
      </ul>

      <div className={css.btnContainer}>
        <button
          onClick={handlePrevious}
          className={css.loadMoreBtn}
          style={{
            cursor: notAllowedPrev ? 'not-allowed' : undefined,
            backgroundColor: notAllowedPrev ? 'lightgray' : undefined,
            color: notAllowedPrev ? 'darkgray' : undefined,
            borderColor: notAllowedPrev ? 'darkgray' : undefined,
          }}
        >
          <IoPlayBackOutline />
        </button>

        <p>{vm.currentPage}</p>

        <button
          onClick={handleNext}
          className={css.loadMoreBtn}
          style={{
            cursor: notAllowedNext ? 'not-allowed' : undefined,
            backgroundColor: notAllowedNext ? 'lightgray' : undefined,
            color: notAllowedNext ? 'darkgray' : undefined,
            borderColor: notAllowedNext ? 'darkgray' : undefined,
          }}
        >
          <TbPlayerTrackNext />
        </button>
      </div>
    </div>
  );
});

export default OrdersHistoryPage;
