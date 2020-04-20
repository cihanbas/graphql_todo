const Movie = {
	director: (parent, args, { db }) =>
		_.find(db.directors, { id: parent.directorID }),
};
module.exports = Movie;
