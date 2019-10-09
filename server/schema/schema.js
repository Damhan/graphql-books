const graphql = require('graphql');
const _ = require('lodash');
//ES6 destructuring to pull out and store.
const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } = graphql;

//Dummy book data
var books = [
    {name: 'Head First Java', genre:'Technology', id:'1',authorId:'2'},
    {name: 'How Algorithms conquered the world', genre:'Technology', id:'2',authorId:'3'},
    {name: 'Romeo & Juliet', genre:'Classic', id:'3',authorId:'1'},
    {name: 'Harry Potter 1', genre:'Childrens', id:'3',authorId:'3'},
    {name: 'Othello', genre:'Classic', id:'3',authorId:'2'},
    {name: 'Harry Potter 2', genre:'Childrens', id:'3',authorId:'3'}
]

//Dummy book data
var authors = [
    {name: 'Mark Twain', age:78, id:'1'},
    {name: 'Shakespere', age:34, id:'2'},
    {name: 'J.K Rowling', age:40, id:'3'}
]


//Defined book object type on our schema.
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args) {
                console.log(parent);
                console.log(parent.authorId);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

//Defined book object type on our schema.
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType, //When querying a booktype
            args: {id:{type: GraphQLID}}, //expects an id to be passed
            resolve(parent,args) {
                //Code to get data from db/othersource.

                //Use lodash to look through our dummy array
                //and find the one with the args id.
                //Then we want to return it.
                return _.find(books, {id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return _.find(authors, {id:args.id})
            }
        },
        books:{
            type: GraphQLList(BookType),
            resolve(parent,args) {
                return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent,args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})