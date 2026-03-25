// db.js

const authors = [
  {
    id: 1,
    name: "David Perell",
    ratingMultiplier: 1.2,
    discountPercent: 10
  },
  {
    id: 2,
    name: "John Walter",
    ratingMultiplier: 1.0,
    discountPercent: 5
  },
  {
    id: 3,
    name: "Illimitable Men",
    ratingMultiplier: 1.5,
    discountPercent: 0
  },
  {
    id: 4,
    name: "Dan Luu",
    ratingMultiplier: 1.1,
    discountPercent: 15
  }
];

const books = [
  {
    id: 1,
    title: "Write of Passage",
    authorId: 1,
    pages: 250,
    basePrice: 20,
    acquiredAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Thinking Clearly",
    authorId: 2,
    pages: 320,
    basePrice: 25,
    acquiredAt: "2023-12-05"
  },
  {
    id: 3,
    title: "Limitless Ideas",
    authorId: 3,
    pages: 400,
    basePrice: 30,
    acquiredAt: "2022-06-20"
  },
  {
    id: 4,
    title: "Systems for Humans",
    authorId: 4,
    pages: 280,
    basePrice: 22,
    acquiredAt: "2023-03-10"
  },
  {
    id: 5,
    title: "Advanced Writing",
    authorId: 1,
    pages: 150,
    basePrice: 15,
    acquiredAt: "2024-02-25"
  }
];

// Helpers
async function getAuthorById(authorId) {
  return authors.find(author => author.id === authorId);
}

async function getBookById(bookId) {
  return books.find(book => book.id === bookId);
}

module.exports = { authors, books, getAuthorById, getBookById };