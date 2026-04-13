require('dotenv').config();
const path = require("node:path");
const { 
    getUsernames, createUsernameGet, createUsernamePost, searchUsername, deleteAllUsernames } = require("./controllers/userController");
const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", getUsernames);
app.get("/new", createUsernameGet);
app.post("/new", createUsernamePost);
app.get("/search", searchUsername);
app.get("/delete", deleteAllUsernames)

app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`My Express app - listening on port ${PORT}`);
});