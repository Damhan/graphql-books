import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {graphql} from 'react-apollo'; 
import {getBooksQuery} from "./../queries/queries";
import BookDetails from './BookDetails';
const BookList = props => {

  const initialState = {
    selected:null
  }

  const [state, setstate] = useState(initialState)

  const BookLink = styled.li`
    background:#5B3D5F;
    color:white;
    margin:0 auto;
    margin-top:0.25em;
    margin-bottom:0.25em;
    padding-top:0.5em;
    padding-bottom:0.5em;
    width:15em;
    list-style-type:none;
    text-align:center;
    border-radius:4px;
    cursor:default;

    &:hover {
    background: #AD386D;
    color: white;
  }
  `

  //Takes the data from props, maps through it & returns the names inside <li> elements.
  const displayBooks = (props) => {
      var data=props.data;
      //Return a "loading books" message as a placeholder while data is retrieved.
      if(data.loading) {
          return (<BookLink>Loading</BookLink>);
      }
      else {
          return data.books.map(book => {
              return(<BookLink key={book.id} onClick={e => {
                setstate({...state, "selected":book.id});
                console.log(state);
              }}>{book.name}</BookLink>);
          })
      }
  }


  return (
    <div>
      
      <ul id="book-list" >
            {displayBooks(props)}

      </ul>
      <BookDetails bookId={state.selected}/>
    </div>
  );
}

//use graphql to bind getBooksQuery to the BookList component.
export default graphql(getBooksQuery)(BookList);
