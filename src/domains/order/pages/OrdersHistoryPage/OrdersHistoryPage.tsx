import css from './OrdersHistoryPage.module.css';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { OrdersVM } from '../../ViewModels/OrdersVM.ts';
import PreviousButton from '../../components/Buttons/PreviousButton';
import NextButton from '../../components/Buttons/NextButton.tsx';
import IOrderResponse from '../../store/IOrderResponse.ts';
import Order from '../../components/Order/Order.tsx';

const OrdersHistoryPage = observer(() => {
  const { ordersStore } = useStore();
  const vm = useMemo(() => new OrdersVM(ordersStore), []);

  useEffect(() => {
    vm.loadOrders(vm.currentPage);
  }, []);

  return (
    <div className={css.container}>
      <h1>
        <span className={css.partTitle}>Orders</span> History
      </h1>
      <ul className={css.list}>
        {vm.orders.map((order: IOrderResponse) => (
          <Order orderId={order.order.id} vm={vm} key={order.order.id} />
        ))}
      </ul>

      <div className={css.btnContainer}>
        <PreviousButton onClick={() => vm.loadOrders(vm.currentPage - 1)} disabled={vm.isFirstPage()} />
        <p>{vm.currentPage}</p>
        <NextButton onClick={() => vm.loadOrders(vm.currentPage + 1)} disabled={vm.isLastPage()} />
      </div>
    </div>
  );
});

export default OrdersHistoryPage;
