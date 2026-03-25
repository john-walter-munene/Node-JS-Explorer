app.use((req, res) => {
  // This works and this ends the request-response cycle
  res.send("Hello");

  // However, it does not exit the function so this will still run
  console.log('will still run!!');

  // This will then throw an error that we cannot send again after sending to the client already
  res.send("Bye");
});

// Middleware.
// req - The request object, representing the incoming HTTP request.
// res - The response object, representing the HTTP response that will be sent back to the client.
// next - The function that passes control to the next middleware function in the chain (we’ll get to this later). This is optional.

// Application level middleware.
// Body parsers (e.g. express.json, express.urlencoded)
// Serving static files: HTML, CSS, JavaScript, and Images

// Router level middleware.
// bound to an instance of Express router using router.use or router.METHOD (e.g. router.get) functions

// Example of a middleware function.
function myMiddleware(req, res, next) {
  // Perform some operations
  console.log("Middleware function called");

  // Modify the request object
  req.customProperty = "Hello from myMiddleware";

  // Call the next middleware/route handler
  next();
}

app.use(myMiddleware);

// Controllers.
// check authorController.js example...

// Error handler middleware
app.use((req, res, next) => {
  throw new Error("OH NO!");
  // or next(new Error("OH NO!"));
});

app.use((err, req, res, next) => {
  console.error(err);
  // You will see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).send(err.message);
});


// Creating custom error handlers.
// check customNotFoundError.

// always remember to organize your code into
// express-app/
// ├─ errors/
// │  ├─ CustomNotFoundError.js
// ├─ controllers/
// │  ├─ authorController.js
// ├─ routes/
// │  ├─ authorRouter.js
// │  ├─ ... other routers
// ├─ app.js
// ├─ db.js