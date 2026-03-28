require('dotenv').config();
const path = require("node:path");
const express = require('express');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.js
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

const services = [
    "Full-stack JavaScript Web Development",
    "Technical Collateral Content for SEO and APIs",
    "API documentation using Swagger and Open API",
    "Social Media Management for X (formerly Twitter)",
]; 

app.get("/", (req, res) => {
  res.render("index", { message: "EJS rocks!", links: links, users: users });
});

app.get("/about", (req, res) => {
    res.render("about", { links: links, services: services });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`My Express app - listening on port ${PORT}`);
});