import IOrderEntity from '../../domains/order/store/IOrderEntity';

class OrdersRepository {
  private orders: IOrderEntity[] = [];

  constructor() {
    this.orders = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      cinemaId: Math.floor(Math.random() * 5) + 1,
      filmId: Math.floor(Math.random() * 10) + 1,
      hallId: Math.floor(Math.random() * 5) + 1,
      seats: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.floor(Math.random() * 100)),
      date: new Date().toLocaleString(),
    }));
  }

  async addOrder(order: IOrderEntity): Promise<void> {
    this.orders.push({ ...order, id: this.orders.length + 1 });
  }

  async getOrders(page: number, pageSize: number): Promise<IOrderEntity[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return this.orders.slice(start, end);
  }

  async getTotalOrdersCount(): Promise<number> {
    return this.orders.length;
  }
}

export default OrdersRepository;
