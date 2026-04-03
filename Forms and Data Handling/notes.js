const { body, validationResult } = require('express-validator');

// The body function
[
  body("birthdate", "Must be a valid date.")
    .optional({ values: "falsy" })
    .isISO8601() // Enforce a YYYY-MM-DD format.
];

// Chaining validations.
[
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can not be empty.")
    .isAlpha()
    .withMessage("Name must only contain alphabet letters."),  
];

{/* <div>
  About Me: <%- description %>!
</div>

// The client then inputs the following as their page's About Me:
<script>alert("Hacked!");</script> */}

// Above code when unescaped, renders as: 
{/* <div>About Me: <script>alert("Hacked!");</script>!</div> */}

// . In EJS, we can escape the output using <%= %>.

{/* <div>
  About Me: <%= username %>!
</div> */}

// The escaped output is now rendered harmless:
// About Me: &lt;script&gt;alert(&quot;Hacked!&quot;);&lt;/script&gt;!


// Validation results
const controller = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  // do stuff if successful
  res.redirect("/success");
};

// Forms and Express routes
exports.userUpdateGet = (req, res, next) => {};
exports.userUpdatePost = (req, res, next) => {};

// Inside our router, we can then assign routes which correspond to the controller’s functions:
const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

// User update routes
usersRouter.get("/:id/update", usersController.userUpdateGet);
usersRouter.post("/:id/update", usersController.userUpdatePost);

module.exports = usersRouter;

// <!-- Example using EJS with POST to submit an update to our Express server. -->
// <form action="/users/<%= user.userId %>/update" method="POST"></form>