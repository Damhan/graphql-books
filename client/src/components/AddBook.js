import React from 'react';
import {useState} from 'react'; 
import {graphql} from 'react-apollo'; 
import {getAuthorsQuery, addBookMutation, getBooksQuery} from './../queries/queries';
import {flowRight as compose} from 'lodash';

const AddBook = props => {


    const initialState = {
        name:"",
        genre:"",
        authorId:""
    }
    //Set our state to default state before form is filled out.
    const[book, setBook] = useState(initialState);

    const submitBookForm = event => {
        event.preventDefault()
        props.addBookMutation({
            variables: {
                name:book.name,
                genre:book.genre,
                authorId:book.authorId
            },
            //What queries need to be refetched with the additional book.
            refetchQueries:[{query: getBooksQuery}]
        });
        setBook(initialState);
    }

    const handleChange = event => {
        const {name, value} = event.target
        setBook({...book, [name]:value});

    
    }


    //Populate the select dropdown with author names.
    const populateAuthors = (props) => {
        var data = props.getAuthorsQuery;
        if(!data.loading) {
            return data.authors.map(author => {
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
        else{
            return(<option disabled>Loading Authors..</option>)
        }
    }

    return (
      <form onSubmit={submitBookForm}>
          <div className="field">
              <label>Book name:</label>
              <input type="text" name="name" onChange={handleChange}/>
          </div>
          <div className="field">
              <label>Genre:</label>
              <input type="text" name="genre" onChange={handleChange}/>
          </div>

          <div className="field">
              <label>Author:</label>
              <select name="authorId" onChange={handleChange}>
                  <option >Select Author</option>
                  {populateAuthors(props)}
              </select>
          </div>

          <button>+</button>

      </form>
    );
  }
//Compose is used to bind multiple queries to one component.
export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);