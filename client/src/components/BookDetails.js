import React from 'react';
import {graphql} from 'react-apollo'; 
import {getBookQuery} from "./../queries/queries";

const BookDetails = props => {

    const displayBook = (props) => {
        const {book} = props.data; 
        if(book) {
            return(<div>
                     <h1>{book.name}</h1>
                     <p>{book.genre}</p>
                     <p>{book.author.name}</p>
                   </div>)
        }
    }

    return (
      <div className="book-details">
          Output book is: {displayBook(props)}
      </div>
    );
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id:props.bookId
            }   
        }

    }
})(BookDetails)
  