const graphql = require('graphql');
const _ = require('lodash');
//ES6 destructuring to pull out and store.
const {GraphQLObjectType , GraphQLString, GraphQLSchema} = graphql;

//
var books = [
    {name: 'Head First Java', genre:'Technology', id:'1'},
    {name: 'How Algorithms conquered the world', genre:'Technology', id:'2'},
    {name: 'Romeo & Juliet', genre:'Classic', id:'3'}
]


//Defined book object type on our schema.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType, //When querying a booktype
            args: {id:{type: GraphQLString}}, //expects an id to be passed
            resolve(parent,args) {
                //Code to get data from db/othersource.

                //Use lodash to look through our dummy array
                //and find the one with the args id.
                //Then we want to return it.
                return _.find(books, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})