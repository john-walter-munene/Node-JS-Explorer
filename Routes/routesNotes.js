const express = require('express');
const app = express();

// Paths...
// Matches both /message and /messages
"/message{s}"

// Matches both / and /messages
"/{messages}"

// Matches both /foo/baz and /foo/bar/baz
"/foo{/bar}/baz"

// Order matter in routes...
// Routes are set up in the server in the order in which they are defined.
app.get("/{*splat}", (req, res) => {
  res.send("/{*splat} is a great way to catch all otherwise unmatched paths, e.g. for custom 404 error handling.");
});

app.get("/messages", (req, res) => {
  res.send("This route will not be reached because the previous route's path matches first.");
});

// Route parameters...
/**
 * GET /odin/messages will have this log
 * { username: "odin" }
 *
 * GET /theodinproject79687378/messages would instead log
 * { username: "theodinproject79687378" }
 */
app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.end();
});

/**
 * GET /odin/messages/79687378 will have this log
 * { username: "odin", messageId: "79687378" }
 */
app.get("/:username/messages/:messageId", (req, res) => {
  console.log(req.params);
  res.end();
});

// Query parameters
/**
 * GET /odin/messages?sort=date&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: "date", direction: "ascending" }
 *
 * GET /odin/messages?sort=date&sort=likes&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: ["date", "likes"], direction: "ascending" }
 */
app.get("/:username/messages", (req, res) => {
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  res.end();
});

//Routers.
// We might want our server to handle the following routes...

// GET /
// GET /about
// GET /contact
// POST /contact

// GET /books
// GET /books/:bookId
// GET /books/:bookId/reserve
// POST /books/:bookId/reserve

// GET /authors
// GET /authors/:authorId