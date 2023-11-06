const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://pratikshah:tcqjc3deA9NKfi4k@cluster0.w9ftcmk.mongodb.net/?retryWrites=true&w=majority');

connection.on('error', (error) => {
	console.error('Mongoose connection error:', error);
});

module.exports = { mongoose, connection };