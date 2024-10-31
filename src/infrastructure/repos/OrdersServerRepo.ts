import MockServer from './MockServer';
import IOrderEntity from '../../domains/order/store/IOrderEntity.ts';

export default class OrdersServerRepo {
  static loadOrders = async (page: number, pageSize: number) => {
    const { orders, total } = await MockServer.fetchOrders(page, pageSize);
    const films = await MockServer.fetchFilms();
    const cinemas = await MockServer.fetchCinemas();

    const ordersWithDetails = orders.map(order => ({
      ...order,
      filmName: films.find(film => film.id === order.filmId)?.name || 'Unknown',
      cinemaAddress: cinemas.find(cinema => cinema.id === order.cinemaId)?.address || 'Unknown',
    }));
    return { orders: ordersWithDetails, total: total };
  };

  static addOrder = (order: IOrderEntity) => MockServer.addOrder(order);
  static deleteOrder = (orderId: number) => MockServer.deleteOrder(orderId);
  static watchedFilms = () => MockServer.fetchWatchedFilms();
}
