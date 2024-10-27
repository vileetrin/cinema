import IHallEntity from '../../domains/cinema/halls/store/IHallEntity.ts';

export class HallsServerRepo {
  static loadHalls = (): Promise<Array<IHallEntity>> => {
    // go to server
    // and fetch data from them
    return Promise.resolve([
      {
        id: 1,
        seatsQuantity: 20,
        filmsId: [1, 2, 7, 9],
        cinemaId: 1,
      },
      {
        id: 2,
        seatsQuantity: 30,
        filmsId: [3, 6, 8],
        cinemaId: 1,
      },
      {
        id: 3,
        seatsQuantity: 33,
        filmsId: [1, 4, 5, 2],
        cinemaId: 1,
      },
      {
        id: 4,
        seatsQuantity: 27,
        filmsId: [2, 5, 9, 8],
        cinemaId: 1,
      },
      {
        id: 5,
        seatsQuantity: 29,
        filmsId: [1, 3, 6, 9],
        cinemaId: 2,
      },
      {
        id: 6,
        seatsQuantity: 31,
        filmsId: [2, 4, 6, 7],
        cinemaId: 2,
      },
      {
        id: 7,
        seatsQuantity: 42,
        filmsId: [2, 3, 5],
        cinemaId: 2,
      },
      {
        id: 8,
        seatsQuantity: 23,
        filmsId: [1, 6, 7],
        cinemaId: 3,
      },
      {
        id: 9,
        seatsQuantity: 21,
        filmsId: [4, 7, 8],
        cinemaId: 3,
      },
      {
        id: 10,
        seatsQuantity: 25,
        filmsId: [5, 8, 9],
        cinemaId: 3,
      },
    ]);
  };
}
