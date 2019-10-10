import React from 'react';
import {useState} from 'react'; 
import {graphql} from 'react-apollo'; 
import {getAuthorsQuery} from './../queries/queries';

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
        console.log(book);
        setBook(initialState);
    }

    const handleChange = event => {
        const {name, value} = event.target
        setBook({...book, [name]:value});

    
    }


    //Populate the select dropdown with author names.
    const populateAuthors = (props) => {
        var data = props.data;
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

export default graphql(getAuthorsQuery)(AddBook);