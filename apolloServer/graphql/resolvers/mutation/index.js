const director = require('./director.mutation');
const movie = require('./movie.mutation');

const Mutation = {
	...movie,
	...director,
};
module.exports = Mutation;
