import IFilmEntity from '../../domains/films/store/IFilmEntity.ts';

export class FilmsServerRepo {
  static loadFilms = (): Promise<Array<IFilmEntity>> => {
    // go to server
    // and fetch data from them
    return Promise.resolve([
      {
        id: 1,
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
          'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Andy Dufresne, a banker wrongly convicted of murder, forms a friendship with fellow inmate Ellis “Red” Redding as they navigate life in Shawshank State Penitentiary, battling corruption, brutality, and their own sense of hope and despair.',
        image: '/img/shawshank-redemption.png',
      },
      {
        id: 3,
        name: 'The Godfather',
        genre: 'Crime',
        description:
          "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son Michael. As he navigates the treacherous world of mob politics and family loyalty, Michael must confront the violent legacy of his family and the dangers of power, ultimately transforming from reluctant outsider to ruthless leader.",
        image: '/img/godfather.png',
      },
      {
        id: 4,
        name: 'The Dark Knight',
        genre: 'Action',
        description:
          "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. Batman, Gordon, and Harvey Dent form an alliance to dismantle organized crime in Gotham, but their efforts are thwarted by the Joker's twisted sense of morality and his insatiable desire to create chaos, leading to a series of harrowing confrontations.",
        image: '/img/dark-knight.png',
      },
      {
        id: 5,
        name: 'Pulp Fiction',
        genre: 'Crime',
        description:
          "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Quentin Tarantino weaves a complex narrative that explores the moral ambiguities of crime and the interconnectedness of human experiences in a vibrant, stylized Los Angeles.",
        image: '/img/pulp-fiction.png',
      },
      {
        id: 6,
        name: 'Forrest Gump',
        genre: 'Drama',
        description:
          'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75. Forrest Gump inadvertently influences many historical events while trying to be with his childhood sweetheart, Jenny, in a poignant tale of love and destiny.',
        image: '/img/forrest-gump.png',
      },
      {
        id: 7,
        name: 'Fight Club',
        genre: 'Drama',
        description:
          'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more. As they grapple with their identities and the consumerist culture that surrounds them, they embark on a journey of self-discovery, rebellion, and chaos that challenges societal norms.',
        image: '/img/fight-club.png',
      },
      {
        id: 8,
        name: 'The Matrix',
        genre: 'Science Fiction',
        description:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. Neo discovers that he is "The One" who can manipulate the Matrix, leading him on a mind-bending journey of self-discovery and rebellion against the oppressive forces controlling humanity.',
        image: '/img/matrix.png',
      },
      {
        id: 9,
        name: 'Interstellar',
        genre: 'Science Fiction',
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Led by former NASA pilot Cooper, they embark on a mission that challenges the very fabric of space and time, confronting existential threats and the bond between father and daughter in a race against time.",
        image: '/img/interstellar.png',
      },
    ]);
  };
}
