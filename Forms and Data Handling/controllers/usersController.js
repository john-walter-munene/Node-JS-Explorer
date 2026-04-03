const usersStorage = require("../storages/usersStorage");
// This just shows the new stuff we're adding to the existing contents
const { body, validationResult, matchedData } = require("express-validator");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

// Error messages...
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email.";
const emailLengthErr = "must be between 6 and 30 characters";
const ageErr = "must be greater than 10 and less than 100";
const bioErr = "must be less than or equal to 200 characters";

// Form validator functions...
const validateUser = [
    body("firstName").trim().matches(/^[A-Za-z ]+$/).withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 70 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim().matches(/^[A-Za-z ]+$/).withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 90 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim().isEmail().withMessage(`Email input ${emailErr}`)
        .isLength({ min: 6, max: 30 }).withMessage(`Email ${emailLengthErr}`),
    body("age").trim().isInt({ min: 10, max: 100 }).withMessage(`Age ${ageErr}`),
    body("bio").trim().isLength({ max: 200 }).withMessage(`Bio ${bioErr}`),    
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).render("createUser", { title: "Create user", errors: errors.array(), });
        }
    
        const { firstName, lastName, email, age, bio } = matchedData(req);
        usersStorage.addUser({ firstName, lastName, email, age, bio });
        res.redirect("/");
    }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearchGet = (req, res) => {
    const { firstName, lastName, email } = req.query;
    
    // If no search query parameters, return search form. 
    if ((!firstName || !lastName) && !email) return res.render("searchUser", { title: "Search a user" });

    // Otherwise proceed to search...
    const result = usersStorage.searchUser({ firstName, lastName, email });
    res.render("searchResults", { title: "Search User Results", result});
}