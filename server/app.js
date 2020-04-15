const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const mongoseeUrl = ''
const app = express();
mongoose.connect(mongoseeUrl)
mongoose.connection.once('open', () => {
    console.log('connectiom database')
})
app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true
}));
app.listen(4000, () => {
    console.log("now listening for request")
});