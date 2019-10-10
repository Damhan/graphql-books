const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema')
const keys = require('./keys.json');


const app = express();

mongoose.connect(keys.mongoUri, {useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log("Connected to mLab mongodb.")
});

//Enable cross origin request
app.use(cors());


app.use('/graphql', graphqlHTTP({
    //ES6 that lets u skip schema:schema
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log("NodeJS server now listening on port 4000..");
});

