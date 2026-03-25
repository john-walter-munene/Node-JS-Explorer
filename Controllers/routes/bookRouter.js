const { Router, request, response } = require('express');
const {  getBookPrice } = require('../controllers/bookController');
const { books } = require("../db");
const bookRouter = Router();

bookRouter.get("/", (request, response) => {
    response.send(books.map(book => book.title).join(", "));
});

bookRouter.get("/:bookId", (req, res) => {
    const { bookId } = req.params;
    res.send(`Book ID: ${bookId}`);
});

bookRouter.get("/price/:bookId", getBookPrice);

module.exports = bookRouter;