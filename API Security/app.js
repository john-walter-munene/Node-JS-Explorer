require("dotenv").config();

const express = require("express");

const authMiddleware = require("./auth");
const { signup, signin } = require("./auth.controller");

const app = express();

app.use(express.json());

app.post("/api/auth/signup", signup);
app.post("/api/auth/signin", signin);

// protected route
app.get("/api/profile", authMiddleware, (req, res) => res.json(req.user));