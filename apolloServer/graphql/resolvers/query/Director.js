const Director = {
	movie: (parent, args, { db }) => {
		return _.find(db.movies, { directorID: parent.id });
	},
};
module.exports = Director;
