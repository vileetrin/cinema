import IOrderEntity from '../../domains/order/store/IOrderEntity';

const ordersDatabase: IOrderEntity[] = Array.from({ length: 10 }, (_, index: number) => ({
  id: index + 1,
  cinemaId: Math.floor(Math.random() * 3) + 1,
  filmId: Math.floor(Math.random() * 9) + 1,
  hallId: Math.floor(Math.random() * 5) + 1,
  seats: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.floor(Math.random() * 100)),
  date: new Date().toLocaleString(),
}));

class OrdersServerRepo {
  private static PAGE_SIZE = 6;

  static async getOrders(page: number, pageSize: number = OrdersServerRepo.PAGE_SIZE): Promise<IOrderEntity[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return new Promise(resolve => {
      setTimeout(() => resolve(ordersDatabase.slice(start, end)), 500);
    });
  }

  static async getTotalOrdersCount(): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => resolve(ordersDatabase.length), 500);
    });
  }

  static async addOrder(order: IOrderEntity): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        ordersDatabase.push(order);
        resolve();
      }, 500);
    });
  }
}

export default OrdersServerRepo;

// import IOrderEntity from '../../domains/order/store/IOrderEntity';
//
// class OrdersServerRepo {
//   private orders: IOrderEntity[] = [];
//
//   constructor() {
//     this.orders = Array.from({ length: 10 }, (_, index: number) => ({
//       id: index + 1,
//       cinemaId: Math.floor(Math.random() * 5) + 1,
//       filmId: Math.floor(Math.random() * 10) + 1,
//       hallId: Math.floor(Math.random() * 5) + 1,
//       seats: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.floor(Math.random() * 100)),
//       date: new Date().toLocaleString(),
//     }));
//   }
//
//   async addOrder(order: IOrderEntity): Promise<void> {
//     this.orders.push({ ...order, id: this.orders.length + 1 });
//   }
//
//   async getOrders(page: number, pageSize: number): Promise<IOrderEntity[]> {
//     const start = (page - 1) * pageSize;
//     const end = start + pageSize;
//     return this.orders.slice(start, end);
//   }
//
//   async getTotalOrdersCount(): Promise<number> {
//     return this.orders.length;
//   }
// }
//
// export default OrdersServerRepo;
