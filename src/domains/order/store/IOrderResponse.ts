import IOrderEntity from './IOrderEntity.ts';

export default interface IOrderResponse {
  order: IOrderEntity;
  cinemaAddress: string | undefined;
  filmName: string | undefined;
}
