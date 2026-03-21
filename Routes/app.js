require('dotenv').config();
const express = require('express');
const app = express();
const authorRouter = require('./authorRouter');
const bookRouter = require('./bookRouter');
const indexRouter = require('./indexRouter');

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) throw new Error(error);

    console.log(`My first Express app - listening on port ${PORT}`);
});