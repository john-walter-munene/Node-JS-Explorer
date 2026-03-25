const { Router } = require("express");
const { getAuthorById } = require("../controllers/authorController");
const { authors } = require("../db");

const authorRouter = Router();

authorRouter.get("/", async (request, response) => {
    const authorNames = authors.map(author => author.name).join(", ");
    response.send(`All authors: ${authorNames}`);
});

authorRouter.get("/:authorId", getAuthorById);

module.exports = authorRouter;