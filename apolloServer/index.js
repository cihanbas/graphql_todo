const { ApolloServer, gql } = require('apollo-server');
const db = require('./data');
const _ = require('lodash');
const { importSchema } = require('graphql-import');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
	typeDefs: importSchema('./graphql/scheme.graphql'),
	resolvers,
	context: {
		db,
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
