import IHallEntity from '../../domains/cinema/halls/store/IHallEntity.ts';

export class HallsServerRepo {
  static loadHalls = (cinemaId: number, filmId: number): Promise<Array<IHallEntity>> => {
    const halls: IHallEntity[] = [
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

    const filteredHalls: IHallEntity[] = halls.filter(
      (hall: IHallEntity): boolean => hall.cinemaId === cinemaId && hall.filmsId.includes(filmId)
    );

    return Promise.resolve(filteredHalls);
  };
}
