const { getBookById, getAuthorById } = require('../db');
const CustomNotFoundError = require("../errors/CustomNotFoundError");

function calculatePrice(book, author) {
    // Base price + page multiplier ($0.05 per page).
    let price = book.basePrice + (book.pages * 0.05);

    // Apply author rating multiplier.
    price = price * author.ratingMultiplier;

    // Apply author discount.
    price = price * (1- author.discountPercent / 100);

    return price.toFixed(2);
}

async function getBookPrice (request, response) {
    const bookId  = Number(request.params.bookId);

    const book = await getBookById(bookId);
    if (!book) throw new CustomNotFoundError("Book is unavailable");

    const author = await getAuthorById(book.authorId);
    if (!author) throw new CustomNotFoundError("Author not found");

    const price = calculatePrice(book, author);
    response.json({
        book: book.title,
        author: author.name,
        price: `At ${price}`,
    });
}

module.exports = { getBookPrice };