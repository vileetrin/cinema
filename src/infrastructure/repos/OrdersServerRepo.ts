import IOrderEntity from '../../domains/order/store/IOrderEntity.ts';

class OrdersServerRepo {
  private static _orders: IOrderEntity[] = [
    { id: 1, filmId: 1, cinemaId: 1, hallId: 1, seats: [1, 2], date: '25.10.2024' },
    { id: 2, filmId: 2, cinemaId: 2, hallId: 2, seats: [3, 4], date: '26.09.2024' },
    { id: 3, filmId: 3, cinemaId: 3, hallId: 3, seats: [5, 6], date: '7.01.2023' },
    { id: 4, filmId: 4, cinemaId: 1, hallId: 4, seats: [7, 8], date: '18.04.2021' },
    { id: 5, filmId: 5, cinemaId: 2, hallId: 5, seats: [9, 10], date: '13.11.2024' },
    { id: 6, filmId: 6, cinemaId: 3, hallId: 6, seats: [11, 12], date: '01.01.2023' },

    // { id: 7, filmId: 1, cinemaId: 1, hallId: 1, seats: [1, 2], date: '1' },
    // { id: 8, filmId: 2, cinemaId: 2, hallId: 2, seats: [3, 4], date: '2' },
    // { id: 9, filmId: 3, cinemaId: 3, hallId: 3, seats: [5, 6], date: '3' },
    // { id: 10, filmId: 4, cinemaId: 1, hallId: 4, seats: [7, 8], date: '4' },
    // { id: 11, filmId: 5, cinemaId: 2, hallId: 5, seats: [9, 10], date: '5' },
    // { id: 12, filmId: 6, cinemaId: 3, hallId: 6, seats: [11, 12], date: '6' },
  ];

  static async loadOrders(page: number, pageSize: number): Promise<{ orders: IOrderEntity[]; total: number }> {
    const startIndex: number = (page - 1) * pageSize;
    // console.log(`PAGE: ${page}, PERPAGE: ${pageSize}`);

    const paginatedOrders: IOrderEntity[] = this._orders.slice(startIndex, startIndex + pageSize);
    return { orders: paginatedOrders, total: this._orders.length };
  }

  static async addOrder(order: IOrderEntity): Promise<void> {
    this._orders.push(order);
  }

  static async deleteOrder(orderId: number): Promise<void> {
    const index: number = this._orders.findIndex((order: IOrderEntity): boolean => order.id === orderId);
    if (index > -1) {
      this._orders.splice(index, 1);
    }
    console.log(this._orders);
  }
}

export default OrdersServerRepo;
