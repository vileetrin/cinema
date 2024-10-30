export default interface IOrderEntity {
  id: number;
  cinemaId: number;
  filmId: number;
  hallId: number;
  seats: number[];
  date: Date;
}
