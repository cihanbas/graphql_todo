const Query = {
	director: (parent, args, { db }) => _.find(db.directors, { id: args.id }),
	movie: (parent, args, { db }) => _.find(db.movies, { id: args.id }),
	directors: (parent, args, { db }) => db.directors,
	movies: (parent, args, { db }) => db.movies,
};
module.exports = Query;
