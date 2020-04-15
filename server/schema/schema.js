const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log('parent', parent)
                return Author.findById(parent.authorId)
                // return _.find(authors, { id: parent.authorId })
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        bookList: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id })
            }
        }

    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id)
                //return _.find(books, { id: args.id })
            },
            description: "it is a single book api"
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Author.findById(args.id)
                // return _.find(authors, { id: args.id })
            },
            description: "it is a single author api"
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) { 
                console.log('args addBook :', args);
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //  return authors
                return Author.find({})
            }
        }


    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return Author(args).save()


            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                console.log('args addBook :', args);
                return Book(args).save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
/*
var books = [
    { name: 'Lord of The Rings The Fellowship of the Ring', genre: 'science', id: '1', authorId: '1' },
    { name: 'Lord of The Rings The Two Towers', genre: 'science', id: '2', authorId: '1' },
    { name: 'Lord of The Rings Return of the King', genre: 'science', id: '3', authorId: '1' },
    { name: "Harry potter and The Philosopher's Stone", genre: 'science', id: '8', authorId: '2' },
    { name: 'Harry Potter and The Chamber of Secrets', genre: 'science', id: '5', authorId: '2' },
    { name: 'Harry Potter and The Prisoner of Azkaban', genre: 'science', id: '6', authorId: '2' },
    { name: 'Harry Potter and The Goblet of Fire', genre: 'science', id: '7', authorId: '2' },
    { name: 'Harry Potter and The Order of the Phoenix', genre: 'science', id: '4', authorId: '2' },
    { name: 'Harry Potter and The Half-Blood Prince', genre: 'science', id: '9', authorId: '2' },
    { name: 'Harry Potter and The Deathly Hallows', genre: 'science', id: '10', authorId: '2' },
];
var authors = [
    { name: 'J.R.R Tolkien', age: 67, id: '1' },
    { name: 'Joanne Kathleen Rowling', age: 54, id: '2' },
    { name: 'Lev tolstoy', age: 65, id: '3' },
]

*/