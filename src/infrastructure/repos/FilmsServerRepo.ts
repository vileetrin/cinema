import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';

interface IFilmData {
  movieId?: number;
  id?: number;
  name?: string;
  title?: string;
  genre?: string;
  description?: string;
  details?: string;
  image?: string;
  thumbnail?: string;
  category?: string;
}

export class FilmsServerRepo {
  static loadFilms = async (): Promise<Array<IFilmEntity>> => {
    const data: IFilmData[] = [
      {
        movieId: 1,
        name: 'Eclipse',
        genre: 'Science Fiction',
        description:
          'Bella and Edward have been reunited, but their forbidden relationship is threatened to be torn apart again with an evil vampire still seeking her revenge. Bella must navigate her complex feelings as she is forced to choose between her love for Edward and her friendship with Jacob Black, amidst the backdrop of a brewing conflict between vampires and werewolves.',
        image: '/img/eclipse.png',
      },
      {
        id: 2,
        name: 'The Shawshank Redemption',
        genre: 'Drama',
        description:
          'Two imprisoned men bond over a number of лет, находя утешение и в конечном счете искупление через акты общей порядочности.',
        thumbnail: '/img/shawshank-redemption.png',
      },
      {
        movieId: 3,
        name: 'The Godfather',
        genre: 'Crime',
        description:
          "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son Michael.",
        image: '/img/godfather.png',
      },
      {
        id: 4,
        title: 'The Dark Knight',
        genre: 'Action',
        details:
          'Когда угроза, известная как Джокер, появляется из своего загадочного прошлого, он сеет хаос среди людей Готэма.',
        thumbnail: '/img/dark-knight.png',
      },
      {
        id: 5,
        title: 'Pulp Fiction',
        genre: 'Crime',
        description:
          "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        image: '/img/pulp-fiction.png',
      },
      {
        id: 6,
        name: 'Forrest Gump',
        category: 'Drama',
        description:
          'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.',
        image: '/img/forrest-gump.png',
      },
      {
        id: 7,
        name: 'Fight Club',
        category: 'Drama',
        description:
          'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.',
        image: '/img/fight-club.png',
      },
      {
        id: 8,
        name: 'The Matrix',
        genre: 'Science Fiction',
        description:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        image: '/img/matrix.png',
      },
      {
        movieId: 9,
        name: 'Interstellar',
        genre: 'Science Fiction',
        details: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        image: '/img/interstellar.png',
      },
    ];

    return data.map(this.transformToIFilmEntity);
  };

  private static transformToIFilmEntity(data: IFilmData): IFilmEntity {
    return {
      id: Number(data.id || data.movieId) || 0,
      name: String(data.name || data.title) || 'Unknown',
      genre: String(data.genre || data.category) || 'Unknown',
      description: String(data.description || data.details) || 'No description available',
      image: String(data.image || data.thumbnail) || '/img/default.png',
    };
  }
}
