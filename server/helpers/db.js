const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CON);
mongoose.connection.on('open', () => {
	console.log('connectiom database');
});
mongoose.connection.on('error', () => {
	console.log('error database');
});
