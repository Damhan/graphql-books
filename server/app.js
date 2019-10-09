const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const keys = require('./keys.json');

const app = express();

mongoose.connect(keys.mongoUri, {useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log("Connected to mLab mongodb.")
});

app.use('/graphql', graphqlHTTP({
    //ES6 that lets u skip schema:schema
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log("NodeJS server now listening on port 4000..");
});

