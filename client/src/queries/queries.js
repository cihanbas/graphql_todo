import { gql } from 'apollo-boost';
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
const ADD_BOOK = gql`
mutation($name:String!,$genre:String!, $authorId:ID!,) {
    addBook(name:$name,genre:$genre,authorId:$authorId ){
        name
        id
    }
}
`
export { getAuthorsQuery, getBooksQuery, ADD_BOOK }