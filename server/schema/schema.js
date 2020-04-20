const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const Movie = require('../models/movie');
const Director = require('../models/director');
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log('parent', parent);
				return Author.findById(parent.authorId);
				// return _.find(authors, { id: parent.authorId })
			},
		},
	}),
});
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
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});
const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		birth: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ directorID: parent.id });
			},
		},
	}),
});
const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		year: { type: GraphQLInt },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				return Director.findById(parent.directorID);
			},
		},
	}),
});
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Book.findById(args.id);
				//return _.find(books, { id: args.id })
			},
			description: 'it is a single book api',
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Author.findById(args.id);
				// return _.find(authors, { id: args.id })
			},
			description: 'it is a single author api',
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				console.log('args addBook :', args);
				return Book.find({});
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//  return authors
				return Author.find({});
			},
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({});
			},
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				return Director.find({});
			},
		},
		movie: {
			type: MovieType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Movie.findById(args.id);
			},
		},
		director: {
			type: DirectorType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Director.findById(args.id);
			},
		},
	},
});
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				return Author(args).save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				console.log('args addBook :', args);
				return Book(args).save();
			},
		},
		addMovie: {
			type: MovieType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				year: { type: new GraphQLNonNull(GraphQLInt) },
				directorID: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				console.log('args', args);
				return Movie(args).save();
			},
		},
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				birth: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				return Director(args).save();
			},
		},
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
