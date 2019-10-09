const graphql = require('graphql');
//ES6 destructuring to pull out and store.
const {GraphQLObjectType , GraphQLString, GraphQLSchema} = graphql;

//Defined book object type on our schema.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

//Defined author object type on our schema.
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType, //When querying a booktype
            args: {id:{GraphQLString}}, //expects an id to be passed
            resolve(parent,args) {
                //Code to get data from db/othersource.
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})