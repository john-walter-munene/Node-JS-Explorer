const db = require("../db");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getAuthorById = async (request, response) => {
    const { authorId } = request.params;

    const author = await db.getAuthorById(Number(authorId));

    if (!author) throw new CustomNotFoundError("Author Not Found");

    response.send(`Author Name: ${author.name}`);
}

module.exports = { getAuthorById }