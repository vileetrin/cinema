import ICinemaEntity from '../../domains/cinema/store/ICinemaEntity.ts';

interface ICinemaData {
  id?: number;
  address?: string;
  filmsId?: number[];
  filmIds?: number[];
}

export class CinemasServerRepo {
  static loadCinemas = (filmId: number): Promise<Array<ICinemaEntity>> => {
    const cinemas: ICinemaData[] = [
      { id: 1, address: '123 Main St, City Center', filmsId: [1, 2, 3, 4, 5, 6, 7, 8] },
      { id: 2, address: '456 Elm St, Downtown', filmsId: [2, 3, 4, 5, 6, 9] },
      { id: 3, address: '789 Oak Ave, Uptown', filmsId: [1, 3, 4, 5, 7, 8, 9] },
    ];

    const filteredCinemas = cinemas
      .filter(cinema => (cinema.filmsId || cinema.filmIds || []).includes(filmId))
      .map(this.transformToICinemaEntity);

    return Promise.resolve(filteredCinemas);
  };

  private static transformToICinemaEntity(data: ICinemaData): ICinemaEntity {
    return {
      id: Number(data.id) || 0,
      address: String(data.address) || 'Unknown Address',
      filmsId: data.filmsId || data.filmIds || [],
    };
  }
}
