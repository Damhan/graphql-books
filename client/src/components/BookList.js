import React from 'react';
import {graphql} from 'react-apollo'; 
import {getBooksQuery} from "./../queries/queries";
const BookList = props => {

  //Rakes the data from props, maps through it & returns the names inside <li> elements.
  const displayBooks = (props) => {
      var data=props.data;
      //Return a "loading books" message as a placeholder while data is retrieved.
      if(data.loading) {
          return (<div>Loading Books</div>);
      }
      else {
          return data.books.map(book => {
              return(<li key={book.id}>{book.name}</li>);
          })
      }
  }


  return (
    <div>
      <ul id="book-list">
          {displayBooks(props)}
      </ul>
    </div>
  );
}

//use graphql to bind getBooksQuery to the BookList component.
export default graphql(getBooksQuery)(BookList);
