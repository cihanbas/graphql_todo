module.exports = {
	createMovie: (parent, args, { db }) => {
		console.log('args', args);

		const movie = {
			id: Math.random().toString(36).substring(2, 10),
			...args.data,
		};
		console.log('movie', movie);
		db.movies.push(movie);
		return movie;
	},
};
