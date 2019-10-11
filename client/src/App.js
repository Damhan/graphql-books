import React from 'react';
import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const MainWrapper = styled.section`
  background:#FCD8A4;
  height:100vh;
`

const HeadingWrapper = styled.section`
  background:#FFB145;
  height:10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 5px grey;
  margin-bottom:1em;
`
const BookActionsWrapper = styled.section`
  display:flex;
`

const BookListWrapper = styled.section`
  width:50vw;
  display:inline-block;
`

const AddBookWrapper = styled.section`
  width:50vw;
  display:inline-block;
  height:100%;
`

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #5B3D5F;
`


function App() {
  return (
    <ApolloProvider client={client}>
      <MainWrapper>

        <HeadingWrapper>
          <Title>Damhan's Reading List</Title>
        </HeadingWrapper>

        <BookActionsWrapper>

          <BookListWrapper>
            <BookList/>
          </BookListWrapper>
          
          <AddBookWrapper>
              <AddBook />
          </AddBookWrapper>

        </BookActionsWrapper>

      </MainWrapper>
    </ApolloProvider>

  );
}

export default App;
