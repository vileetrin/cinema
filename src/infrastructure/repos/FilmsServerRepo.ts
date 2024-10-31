import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';

type NetflixFilm = {
  id: number;
  title: string;
  genre: string;
  description: string;
  image: string;
};

type AppleFilm = {
  filmId: number;
  name: string;
  category: string;
  details: string;
  thumbnail: string;
};

export class FilmsServerRepo {
  static loadFilms = async (): Promise<Array<IFilmEntity>> => {
    return Promise.all([
      this.loadAppleFilms().then(apple => apple.map(this.convertFromApple)),
      this.loadFilmsFromNetflix().then(netflix => netflix.map(this.convertFromNetflix)),
    ]).then(arrays => arrays.flat());
  };

  private static loadAppleFilms = async (): Promise<Array<AppleFilm>> => {
    return [
      {
        filmId: 1,
        name: 'Eclipse',
        category: 'Science Fiction',
        details: 'Bella and Edward have been reunited, but their forbidden relationship is threatened...',
        thumbnail: '/img/eclipse.png',
      },
      {
        filmId: 2,
        name: 'The Shawshank Redemption',
        category: 'Drama',
        details: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption...',
        thumbnail: '/img/shawshank-redemption.png',
      },
      {
        filmId: 3,
        name: 'The Godfather',
        category: 'Crime',
        details: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire...",
        thumbnail: '/img/godfather.png',
      },
      {
        filmId: 4,
        name: 'The Dark Knight',
        category: 'Action',
        details: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc...',
        thumbnail: '/img/dark-knight.png',
      },
      {
        filmId: 5,
        name: 'Pulp Fiction',
        category: 'Crime',
        details: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine...",
        thumbnail: '/img/pulp-fiction.png',
      },
    ];
  };

  private static loadFilmsFromNetflix = async (): Promise<Array<NetflixFilm>> => {
    return [
      {
        id: 6,
        title: 'Forrest Gump',
        genre: 'Drama',
        description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man...',
        image: '/img/forrest-gump.png',
      },
      {
        id: 7,
        title: 'Fight Club',
        genre: 'Drama',
        description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club...',
        image: '/img/fight-club.png',
      },
      {
        id: 8,
        title: 'The Matrix',
        genre: 'Science Fiction',
        description: 'A computer hacker learns about the true nature of his reality and his role in the war...',
        image: '/img/matrix.png',
      },
      {
        id: 9,
        title: 'Interstellar',
        genre: 'Science Fiction',
        description: "A team of explorers travel through a wormhole in space to ensure humanity's survival...",
        image: '/img/interstellar.png',
      },
    ];
  };

  private static convertFromApple = (data: AppleFilm): IFilmEntity => {
    return {
      id: data.filmId,
      name: data.name,
      genre: data.category,
      description: data.details,
      image: data.thumbnail,
    };
  };

  private static convertFromNetflix = (data: NetflixFilm): IFilmEntity => {
    return {
      id: data.id,
      name: data.title,
      genre: data.genre,
      description: data.description,
      image: data.image,
    };
  };
}
