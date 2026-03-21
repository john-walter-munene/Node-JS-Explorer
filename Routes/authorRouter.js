// routes/authorRouter.js
const { Router } = require('express');
const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All Authors"));

authorRouter.get("/:authorId", (req, res) => {
    const { authorId } = req.params;
    const { authorName } = req.query;
    res.send(`Author ID: ${authorId} by ${authorName}`);
});

module.exports = authorRouter;