//express stuff
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const passport = require("passport");
const jwtStrategry  = require("./strategies.jwt");
passport.use(jwtStrategry);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello express server");
})

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    
    //This lookup would normally be done using a database
      if (email === "paul@nanosoft.co.za") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
            opts.expiresIn = 120;  //token expires in 2min
            const secret = "SECRET_KEY" //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);

            return res.status(200).json({ message: "Auth Passed", token });
        }
    }

    return res.status(401).json({ message: "Auth Failed" });
});

app.listen(3000);