require('dotenv').config();
const express = require('express');
const app = express();

const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);

// Every thrown error in the application or the previous middleware function calling `next` 
// with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) throw new Error(error);

    console.log(`My Express app - listening on port ${PORT}`);
});