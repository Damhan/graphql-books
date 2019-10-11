import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre:$genre, authorId:$authorId) {
            name
            genre
            author {
                name
            }
        }
    }
`

const getBookQuery = gql`

    query($id: ID) {
      book(id:$id) {
        id
        name
        genre
        author {
          id
          name
        }
      }
    }

`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};