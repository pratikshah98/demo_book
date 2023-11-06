const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/get_books', bookController.get_books);
router.post('/add_book', bookController.add_book);
router.post('/update_book', bookController.update_book);
router.get('/delete_book', bookController.delete_book);
router.get('/get_book_detail_by_id', bookController.get_book_detail_by_id);

module.exports = router;