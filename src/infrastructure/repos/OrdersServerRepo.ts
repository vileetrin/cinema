import IOrderEntity from '../../domains/order/store/IOrderEntity.ts';

class OrdersServerRepo {
  private static _orders: IOrderEntity[] = [
    { id: 1, filmId: 1, cinemaId: 1, hallId: 1, seats: [1, 2], date: new Date('2023-03-17') },
    { id: 2, filmId: 2, cinemaId: 2, hallId: 2, seats: [3, 4], date: new Date('2024-09-26') },
    { id: 3, filmId: 3, cinemaId: 3, hallId: 3, seats: [5, 6], date: new Date('2023-01-07') },
    { id: 4, filmId: 4, cinemaId: 1, hallId: 4, seats: [7, 8], date: new Date('2021-04-18') },
    { id: 5, filmId: 5, cinemaId: 2, hallId: 5, seats: [9, 10], date: new Date('2024-11-13') },
    { id: 6, filmId: 6, cinemaId: 3, hallId: 6, seats: [11, 12], date: new Date('2023-08-01') },

    { id: 7, filmId: 1, cinemaId: 1, hallId: 1, seats: [1, 2], date: new Date('2001-01-01') },
    { id: 8, filmId: 2, cinemaId: 2, hallId: 2, seats: [3, 4], date: new Date('2002-02-02') },
    { id: 9, filmId: 3, cinemaId: 3, hallId: 3, seats: [5, 6], date: new Date('2003-03-03') },
    { id: 10, filmId: 4, cinemaId: 1, hallId: 4, seats: [7, 8], date: new Date('2004-04-04') },
    { id: 11, filmId: 5, cinemaId: 2, hallId: 5, seats: [9, 10], date: new Date('2005-05-05') },
    { id: 12, filmId: 6, cinemaId: 3, hallId: 6, seats: [11, 12], date: new Date('2006-06-06') },
  ];

  static async loadOrders(page: number, pageSize: number): Promise<{ orders: IOrderEntity[]; total: number }> {
    const sortedOrders: IOrderEntity[] = this._orders
      .slice()
      .sort((a: IOrderEntity, b: IOrderEntity) => b.date.getTime() - a.date.getTime());

    const startIndex: number = (page - 1) * pageSize;
    const paginatedOrders: IOrderEntity[] = sortedOrders.slice(startIndex, startIndex + pageSize);

    return { orders: paginatedOrders, total: this._orders.length };
  }

  static async addOrder(order: IOrderEntity): Promise<void> {
    this._orders.unshift(order);
  }

  static async deleteOrder(orderId: number): Promise<void> {
    const index: number = this._orders.findIndex((order: IOrderEntity): boolean => order.id === orderId);
    if (index > -1) {
      this._orders.splice(index, 1);
    }
  }

  static async watchedFilms(): Promise<{ watchedFilms: number[] }> {
    const result: number[] = this._orders.map((order: IOrderEntity): number => order.filmId);
    return { watchedFilms: result };
  }
}

export default OrdersServerRepo;
