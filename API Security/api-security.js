const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, "secretkey", (error, authData) => {
        if (error) res.sendStatus(403);
        else res.json({ message: "Post created...", authData, });
    });

    
});

app.post("/api/login", (req, res) => {
    // Mock user
    const user = { id: 1, username: "John Walter", email: "johnwaltermunene@gmail.com" };
    
    jwt.sign({ user }, "secretkey", { expiresIn: '30s'}, (error, token) => {
        res.json({ token });
    });
});

// FORMAT TOKEN
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];

    // Chcek if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");

        //  Get oken form array
        const bearerToken = bearer[1];

        // Set the token
        req.token = bearerToken;

        // Next middleware
        next();
    } else res.sendStatus(403);
}
 
app.listen(3000, () => console.log("Server started on port 3000"));