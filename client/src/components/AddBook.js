import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo'; 

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const AddBook = props => {

    //Populate the select dropdown with author names.
    const populateAuthors = (props) => {
        var data = props.data;
        if(!data.loading) {
            return data.authors.map(author => {
                return(<option key={author.id}>{author.name}</option>)
            })
        }
        else{
            return(<option disabled>Loading Authors..</option>)
        }
    }

    return (
      <form>
          <div className="field">
              <label>Book name:</label>
              <input type="text"/>
          </div>
          <div className="field">
              <label>Genre:</label>
              <input type="text"/>
          </div>

          <div className="field">
              <label>Author:</label>
              <select>
                  {populateAuthors(props)}
              </select>
          </div>

          <button>+</button>

      </form>
    );
  }

export default graphql(getAuthorsQuery)(AddBook);