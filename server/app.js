const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    //ES6 that lets u skip schema:schema
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log("NodeJS server now listening on port 4000..");
});

