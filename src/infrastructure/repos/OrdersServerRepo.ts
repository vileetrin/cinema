import MockServer from './MockServer';
import IOrderEntity from '../../domains/order/store/IOrderEntity.ts';
import IOrderResponse from '../../domains/order/store/IOrderResponse.ts';

export default class OrdersServerRepo {
  static loadOrders = (page: number, pageSize: number): Promise<{ orders: IOrderResponse[]; total: number }> =>
    MockServer.fetchOrders(page, pageSize);

  static loadOrder = (orderId: number) => MockServer.fetchOrder(orderId);
  static addOrder = (order: IOrderEntity): Promise<void> => MockServer.addOrder(order);
  static deleteOrder = (orderId: number): Promise<void> => MockServer.deleteOrder(orderId);
}
