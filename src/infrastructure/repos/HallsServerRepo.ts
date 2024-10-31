import IHallEntity from '../../domains/cinema/halls/store/IHallEntity.ts';

interface IHallData {
  id?: number;
  seatsQuantity?: number;
  seats?: number;
  filmsId?: number[];
  filmIds?: number[];
  cinemaId?: number;
  cinema?: number;
}

export class HallsServerRepo {
  static loadHalls = (cinemaId: number, filmId: number): Promise<Array<IHallEntity>> => {
    const halls: IHallData[] = [
      { id: 1, seatsQuantity: 20, filmsId: [1, 2, 6, 7], cinema: 1 },
      { id: 2, seatsQuantity: 30, filmsId: [3, 6, 8], cinema: 1 },
      { id: 3, seats: 33, filmsId: [1, 2, 6, 7], cinemaId: 1 },
      { id: 4, seatsQuantity: 27, filmsId: [2, 3, 6, 8], cinemaId: 1 },
      { id: 5, seatsQuantity: 29, filmIds: [2, 3, 6, 9], cinemaId: 2 },
      { id: 6, seatsQuantity: 31, filmsId: [2, 4, 5, 7], cinemaId: 2 },
      { id: 7, seats: 42, filmsId: [3, 4, 5, 6, 9], cinemaId: 2 },
      { id: 8, seatsQuantity: 23, filmsId: [1, 5, 7, 9], cinema: 3 },
      { id: 9, seatsQuantity: 21, filmsId: [3, 4, 7, 8, 9], cinemaId: 3 },
      { id: 10, seatsQuantity: 25, filmIds: [1, 4, 5, 8, 9], cinemaId: 3 },
    ];

    const filteredHalls: IHallEntity[] = halls
      .filter(
        (hall: IHallData): boolean =>
          (hall.cinemaId || hall.cinema) === cinemaId && (hall.filmsId || hall.filmIds || []).includes(filmId)
      )
      .map(this.transformToIHallEntity);

    return Promise.resolve(filteredHalls);
  };

  private static transformToIHallEntity(data: IHallData): IHallEntity {
    return {
      id: Number(data.id) || 0,
      seatsQuantity: Number(data.seatsQuantity) || Number(data.seats) || 0,
      filmsId: data.filmsId || data.filmIds || [],
      cinemaId: Number(data.cinemaId) || Number(data.cinema) || 0,
    };
  }
}
