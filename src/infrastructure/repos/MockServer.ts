import IOrderEntity from '../../domains/order/store/IOrderEntity.ts';
import IHallEntity from '../../domains/cinema/halls/store/IHallEntity.ts';
import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';
import ICinemaEntity from '../../domains/cinema/store/ICinemaEntity.ts';
import IFilmResponse from '../../domains/films/store/IFilmResponse.ts';
import IOrderResponse from '../../domains/order/store/IOrderResponse.ts';

class MockServer {
  private static orders: IOrderEntity[] = [
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

  private static halls: IHallEntity[] = [
    { id: 1, seatsQuantity: 20, filmsId: [1, 2, 6, 7], cinemaId: 1 },
    { id: 2, seatsQuantity: 30, filmsId: [3, 6, 8], cinemaId: 1 },
    { id: 3, seatsQuantity: 33, filmsId: [1, 2, 6, 7], cinemaId: 1 },
    { id: 4, seatsQuantity: 27, filmsId: [2, 3, 6, 8], cinemaId: 1 },
    { id: 5, seatsQuantity: 29, filmsId: [2, 3, 6, 9], cinemaId: 2 },
    { id: 6, seatsQuantity: 31, filmsId: [2, 4, 5, 7], cinemaId: 2 },
    { id: 7, seatsQuantity: 42, filmsId: [3, 4, 5, 6, 9], cinemaId: 2 },
    { id: 8, seatsQuantity: 23, filmsId: [1, 5, 7, 9], cinemaId: 3 },
    { id: 9, seatsQuantity: 21, filmsId: [3, 4, 7, 8, 9], cinemaId: 3 },
    { id: 10, seatsQuantity: 25, filmsId: [1, 4, 5, 8, 9], cinemaId: 3 },
  ];

  private static films: IFilmEntity[] = [
    {
      id: 1,
      name: 'Eclipse',
      genre: 'Science Fiction',
      description: 'Bella and Edward have been reunited, but their forbidden relationship is threatened...',
      image: '/img/eclipse.png',
    },
    {
      id: 2,
      name: 'The Shawshank Redemption',
      genre: 'Drama',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption...',
      image: '/img/shawshank-redemption.png',
    },
    {
      id: 3,
      name: 'The Godfather',
      genre: 'Crime',
      description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire...",
      image: '/img/godfather.png',
    },
    {
      id: 4,
      name: 'The Dark Knight',
      genre: 'Action',
      description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc...',
      image: '/img/dark-knight.png',
    },
    {
      id: 5,
      name: 'Pulp Fiction',
      genre: 'Crime',
      description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine...",
      image: '/img/pulp-fiction.png',
    },
    {
      id: 6,
      name: 'Forrest Gump',
      genre: 'Drama',
      description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man...',
      image: '/img/forrest-gump.png',
    },
    {
      id: 7,
      name: 'Fight Club',
      genre: 'Drama',
      description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club...',
      image: '/img/fight-club.png',
    },
    {
      id: 8,
      name: 'The Matrix',
      genre: 'Science Fiction',
      description: 'A computer hacker learns about the true nature of his reality and his role in the war...',
      image: '/img/matrix.png',
    },
    {
      id: 9,
      name: 'Interstellar',
      genre: 'Science Fiction',
      description: "A team of explorers travel through a wormhole in space to ensure humanity's survival...",
      image: '/img/interstellar.png',
    },
  ];

  private static cinemas: ICinemaEntity[] = [
    { id: 1, address: '123 Main St, City Center', filmsId: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 2, address: '456 Elm St, Downtown', filmsId: [2, 3, 4, 5, 6, 9] },
    { id: 3, address: '789 Oak Ave, Uptown', filmsId: [1, 3, 4, 5, 7, 8, 9] },
  ];

  static async fetchOrders(page: number, pageSize: number) {
    const sortedOrders: IOrderEntity[] = this.orders
      .slice()
      .sort((a: IOrderEntity, b: IOrderEntity): number => b.date.getTime() - a.date.getTime());
    const startIndex: number = (page - 1) * pageSize;
    const paginatedOrders: IOrderEntity[] = sortedOrders.slice(startIndex, startIndex + pageSize);

    const filmName = (filmId: number): string | undefined => {
      const film: IFilmEntity | undefined = this.films.find((film: IFilmEntity): boolean => film.id === filmId);
      return film ? film.name : undefined;
    };

    const cinemaAddress = (cinemaId: number): string | undefined => {
      const cinema: ICinemaEntity | undefined = this.cinemas.find(
        (cinema: ICinemaEntity): boolean => cinema.id === cinemaId
      );
      console.log(cinema?.address);
      return cinema ? cinema.address : undefined;
    };

    const detailedOrders: IOrderResponse[] = paginatedOrders.map(
      (order: IOrderEntity): IOrderResponse => ({
        order,
        cinemaAddress: cinemaAddress(order.cinemaId),
        filmName: filmName(order.filmId),
      })
    );
    return { orders: detailedOrders, total: this.orders.length };
  }

  static async addOrder(order: IOrderEntity): Promise<void> {
    this.orders.unshift(order);
  }

  static async deleteOrder(orderId: number): Promise<void> {
    this.orders = this.orders.filter((order: IOrderEntity): boolean => order.id !== orderId);
  }

  static async fetchHalls(cinemaId: number, filmId: number): Promise<IHallEntity[]> {
    return this.halls.filter(
      (hall: IHallEntity): boolean => hall.cinemaId === cinemaId && hall.filmsId.includes(filmId)
    );
  }

  static async fetchFilms(): Promise<Array<IFilmResponse>> {
    const watchedFilmsIds: number[] = await this.fetchWatchedFilmIds();
    return this.films.map((film: IFilmEntity) => ({
      film,
      isWatched: watchedFilmsIds.includes(film.id),
    }));
  }

  static async fetchFilm(filmId: number): Promise<IFilmResponse> {
    const watchedFilmsIds: number[] = await this.fetchWatchedFilmIds();
    const foundFilm: IFilmEntity | undefined = this.films.find((film: IFilmEntity): boolean => film.id === filmId);
    return {
      film: foundFilm,
      isWatched: watchedFilmsIds.includes(filmId),
    };
  }

  static async fetchWatchedFilmIds(): Promise<number[]> {
    const filmIds = new Set(this.orders.map((order: IOrderEntity): number => order.filmId));
    return Array.from(filmIds);
  }

  static async fetchCinemas(filmId?: number): Promise<ICinemaEntity[]> {
    if (filmId !== undefined) {
      return this.cinemas.filter((cinema: ICinemaEntity): boolean => cinema.filmsId.includes(filmId));
    }
    return this.cinemas;
  }
}

export default MockServer;
