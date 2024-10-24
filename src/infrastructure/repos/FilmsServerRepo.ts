import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';

export class FilmsServerRepo {

  static loadFilms = (): Promise<Array<IFilmEntity>> => {
    // go to server
    // and fetch data from them
    return Promise.resolve(
      [
        {
          id: 1,
          name: 'Eclipse',
          genre: 'Science Fiction',
          description: 'In the future, when the sun has disappeared, a group of survivors fights for survival.',
          image: '/img/eclipse.png',
        },
        {
          id: 2,
          name: 'The Shawshank Redemption',
          genre: 'Drama',
          description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
          image: '/img/shawshank-redemption.png',
        },
        {
          id: 3,
          name: 'The Godfather',
          genre: 'Crime',
          description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
          image: '/img/godfather.png',
        },
        {
          id: 4,
          name: 'The Dark Knight',
          genre: 'Action',
          description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
          image: '/img/dark-knight.png',
        },
        {
          id: 5,
          name: 'Pulp Fiction',
          genre: 'Crime',
          description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
          image: '/img/pulp-fiction.png',
        },
        {
          id: 6,
          name: 'Forrest Gump',
          genre: 'Drama',
          description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.',
          image: '/img/forrest-gump.png',
        },
        {
          id: 7,
          name: 'Fight Club',
          genre: 'Drama',
          description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.',
          image: '/img/fight-club.png',
        },
        {
          id: 8,
          name: 'The Matrix',
          genre: 'Science Fiction',
          description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
          image: '/img/matrix.png',
        },
        {
          id: 9,
          name: 'Interstellar',
          genre: 'Science Fiction',
          description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
          image: '/img/interstellar.png',
        },
      ],
    );
  };
}