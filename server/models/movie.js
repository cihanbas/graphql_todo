const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
	title: String,
	description: String,
	year: Number,
	directorID: String
});
module.exports = mongoose.model('Movie', movieSchema);
