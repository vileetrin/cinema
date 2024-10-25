import ICinemaEntity from '../../domains/cinema/store/ICinemaEntity.ts';

export class CinemasServerRepo {
  static loadCinemas = (): Promise<Array<ICinemaEntity>> => {
    // go to server
    // and fetch data from them
    return Promise.resolve([
      {
        id: 1,
        address: '123 Main St, City Center',
      },
      {
        id: 2,
        address: '456 Elm St, Downtown',
      },
      {
        id: 3,
        address: '789 Oak Ave, Uptown',
      },
    ]);
  };
}
