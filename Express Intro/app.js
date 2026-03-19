require('dotenv').config();
const express = require('express');

const app = express();

app.get("/", (request, response) => response.send("Hello World"));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    // This is important
    // without this, any startup errors will silently fail
    // instead of giving you a helpful error message
    if (error) throw new Error(error);
    console.log(`My first Express app - listening on on port ${PORT}!`);
});
