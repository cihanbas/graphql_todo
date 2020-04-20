import {gql} from 'apollo-boost';
const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
      age
    }
  }
`;
const getMovieListQuery = gql`
  {
    movies {
      title
      description
      id
    }
  }
`;
const getDirectoriesQuery = gql`
  {
    directors {
      name
      birth
      id
    }
  }
`;
const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const ADD_MOVIE = gql`
  mutation(
    $title: String!
    $description: String
    $directorID: ID!
    $year: Int!
  ) {
    createMovie(
      data: {
        title: $title
        description: $description
        year: $year
        directorID: $directorID
      }
    ) {
      title
      id
    }
  }
`;
const GET_MOVIE_BY_ID = gql`
  query movie($id: ID!) {
    movie(id: $id) {
      id
      title
      description
      year
      director {
        id
        name
        birth
      }
    }
  }
`;
export {
  getAuthorsQuery,
  getBooksQuery,
  ADD_BOOK,
  getDirectoriesQuery,
  getMovieListQuery,
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
};
