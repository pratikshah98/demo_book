const Joi = require('joi');

const { mongoose, connection } = require("../../mongoClient");
const { BooksModel } = require("../models/book");
exports.get_books = async (req, res) => {
    const book_data = await BooksModel.find().lean().exec();
    if (book_data.length > 0) {
        res.status(200).json({ message: 'Book Detail Fetch Successfully', response: book_data });
    } else {
        res.status(400).json({ message: 'No Book Detail Fetch Successfully', response: [] });
    }

}

exports.add_book = async (req, res) => {

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        summary: Joi.string().required(),

    });

    const { value: validationValue, error: validationError } = schema.validate(req.body, { abortEarly: true });

    if (validationError) {
        if (validationError.details && validationError.details[0].message) {
            res.status(200).json({ status: 400, message: validationError.details[0].message });
        } else {
            res.status(200).json({ status: 400, message: error.message });
        }
        return;
    }

    await BooksModel.create(validationValue).catch(err => {
        console.log('abc', err);
        return res.status(400).json({ message: err.message });
    })

    res.status(200).json({ message: 'Book Added Successfully', response: [] });
}
exports.update_book = async (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string().optional().allow(''),
        author: Joi.string().optional().allow(''),
        summary: Joi.string().optional().allow('')

    });

    const { value: validationValue, error: validationError } = schema.validate(req.body, { abortEarly: true });

    if (validationError) {
        if (validationError.details && validationError.details[0].message) {
            res.status(200).json({ status: 400, message: validationError.details[0].message });
        } else {
            res.status(200).json({ status: 400, message: error.message });
        }
        return;
    }

    const id = validationValue.id;
    delete validationValue.id;

    const book_data = await BooksModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), validationValue, { new: true });
    if (book_data) {
        res.status(200).json({ message: 'Book Detail Updated Successfully', response: book_data });
    } else {
        res.status(400).json({ message: 'No Book Detail Updated Successfully', response: [] });
    }

}

exports.delete_book = async (req, res) => {
    const id = req.query.id;
    const book_data = await BooksModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).lean().exec();
    console.log(book_data)
    if (book_data) {
        res.status(200).json({ message: 'Book Detail Delete Successfully', response: [] });
    } else {
        res.status(400).json({ message: 'No Book Detail Delete Successfully', response: [] });
    }
}

exports.get_book_detail_by_id = async (req, res) => {
    const id = req.query.id;
    const book_data = await BooksModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean().exec();
    console.log(book_data)
    if (book_data) {
        res.status(200).json({ message: 'Book Detail Fetch Successfully', response: book_data });
    } else {
        res.status(400).json({ message: 'No Book Detail Fetch Successfully', response: [] });
    }

}

