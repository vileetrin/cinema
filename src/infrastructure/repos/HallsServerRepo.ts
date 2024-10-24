import IHallEntity from "../../domains/cinema/halls/store/IHallEntity.ts";

export class HallsServerRepo {

    static loadHalls = (): Promise<Array<IHallEntity>> => {
        // go to server
        // and fetch data from them
        return Promise.resolve(
            [
                {
                    id: 1,
                    seatsQuantity: 100,
                    filmsId: [1, 2, 7, 9],
                },
                {
                    id: 2,
                    seatsQuantity: 80,
                    filmsId: [3, 6, 8],
                },
                {
                    id: 3,
                    seatsQuantity: 120,
                    filmsId: [1, 4, 5, 2],
                },
                {
                    id: 4,
                    seatsQuantity: 60,
                    filmsId: [2, 5, 9, 8],
                },
                {
                    id: 5,
                    seatsQuantity: 150,
                    filmsId: [1, 3, 6, 9],
                },
                {
                    id: 6,
                    seatsQuantity: 90,
                    filmsId: [2, 4, 6, 7],
                },
                {
                    id: 7,
                    seatsQuantity: 90,
                    filmsId: [2, 3, 5],
                },
                {
                    id: 8,
                    seatsQuantity: 90,
                    filmsId: [1, 6, 7],
                },
                {
                    id: 9,
                    seatsQuantity: 90,
                    filmsId: [4, 7, 8],
                },
                {
                    id: 10,
                    seatsQuantity: 90,
                    filmsId: [5, 8, 9],
                },
            ],
        );
    };
}