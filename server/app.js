const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema/schema');

//.env
require('dotenv').config();
//db
const db = require('./helpers/db');

const app = express();

app.use(
	'/graphql',
	graphQLHTTP({
		schema,
		graphiql: true
	})
);
app.listen(4000, () => {
	console.log('now listening for request');
});
