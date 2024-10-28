import ICinemaEntity from '../../domains/cinema/store/ICinemaEntity.ts';

export class CinemasServerRepo {
  static loadCinemas = (filmId: number): Promise<Array<ICinemaEntity>> => {
    const cinemas: ICinemaEntity[] = [
      { id: 1, address: '123 Main St, City Center', filmsId: [1, 2, 3, 6, 7, 8] },
      { id: 2, address: '456 Elm St, Downtown', filmsId: [2, 3, 4, 5, 6, 9] },
      { id: 3, address: '789 Oak Ave, Uptown', filmsId: [1, 3, 4, 5, 7, 8, 9] },
    ];

    const filteredCinemas = cinemas.filter(cinema => cinema.filmsId.includes(filmId));
    return Promise.resolve(filteredCinemas);
  };
}
