const { ObjectId } = require("mongodb");
const { mongoose, connection } = require("../../mongoClient");
const Schema = mongoose.Schema;

const books = new Schema({
    title: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    summary: {
        type: String,
        default: ''
    },
    created_on: {
        type: Date,
        default: new Date()
    },
    updated_on: {
        type: Date,
        default: new Date()
    },

});

exports.BooksModel = connection.model("books", books);