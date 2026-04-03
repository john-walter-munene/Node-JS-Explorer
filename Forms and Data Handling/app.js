require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const usersRouter = require('./routes/usersRouter');

// Template engine config...
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Parser to access body content in post requests.
app.use(express.urlencoded({ extended: true }));

// Routes in use...
app.use("/", usersRouter);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`Express app listening on port: ${PORT}`);
})